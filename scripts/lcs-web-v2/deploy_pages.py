"""Prepare/publish only lcs/ in the existing q/main Pages repository.

Normal execution prepares an isolated checkout and validates its staged diff.
Use --publish --checkout <prepared checkout> to push that exact prepared result.
Uses the caller's existing Git/SSH credentials; never changes global settings.
"""
import argparse
import hashlib
import json
import os
import shutil
import subprocess
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BUILD = ROOT / 'dist/lcs-web-v2'
VALIDATION = ROOT / 'docs/lcs-web-v2/validation'
REMOTE = 'git@github-work:ToastmastersLee/q.git'
SITE = 'https://toastmasterslee.github.io/q/lcs/'


def git(directory, *args):
    env = dict(os.environ, GIT_TERMINAL_PROMPT='0')
    result = subprocess.run(['git', '-C', str(directory), *args], capture_output=True,
                            text=True, encoding='utf-8', env=env, timeout=120)
    if result.returncode:
        raise RuntimeError(f'git {args[0]} failed: {result.stderr}')
    return result.stdout.strip()


def hashes(root):
    return {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(root.rglob('*')) if p.is_file()}


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2) + '\n', encoding='utf-8')


def validate_checkout(checkout, manifest):
    if git(checkout, 'remote', 'get-url', 'origin') != REMOTE:
        raise ValueError('Unexpected public remote')
    if git(checkout, 'branch', '--show-current') != 'main':
        raise ValueError('Expected main branch')
    if hashes(checkout / 'lcs') != manifest:
        raise ValueError('Staged site does not match the verified build')
    if git(checkout, 'diff', '--name-only'):
        raise ValueError('Unstaged changes in deployment checkout')
    changes = git(checkout, 'diff', '--cached', '--name-only').splitlines()
    if not changes or any(not path.startswith('lcs/') for path in changes):
        raise ValueError('Expected changes only inside lcs/')
    return changes


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--checkout', type=Path)
    parser.add_argument('--publish', action='store_true')
    args = parser.parse_args()
    if args.publish and not args.checkout:
        raise ValueError('Publish requires an explicitly prepared checkout')
    manifest = hashes(BUILD)
    release = json.loads((VALIDATION / 'release.json').read_text(encoding='utf-8'))
    if not manifest or manifest != release['files']:
        raise ValueError('Build does not match the verified release manifest')
    checkout = args.checkout.resolve() if args.checkout else None
    if not checkout:
        stamp = datetime.now().strftime('%Y%m%d-%H%M%S-%f')
        deployment = ROOT / 'dist/lcs-web-v2-deploy' / stamp
        deployment.mkdir(parents=True, exist_ok=False)
        checkout = deployment / 'checkout'
        git(deployment, '-c', 'core.autocrlf=false', 'clone', '--depth', '1', '--branch', 'main', '--single-branch', REMOTE, str(checkout))
        git(checkout, 'config', 'core.autocrlf', 'false')
        previous = git(checkout, 'rev-parse', 'HEAD')
        tracked = git(checkout, 'ls-tree', '-r', 'HEAD').splitlines()
        # Record every pre-existing file outside this site's ownership boundary.
        preserved = {line.split('\t', 1)[1]: line.split()[2] for line in tracked
                     if not line.split('\t', 1)[1].startswith('lcs/')}
        target = (checkout / 'lcs').resolve()
        if target.parent != checkout.resolve():
            raise ValueError('Unexpected deployment target')
        # Remove only superseded files owned by lcs/, never root assets or other sites.
        if target.exists():
            for path in target.rglob('*'):
                if path.is_file() and path.relative_to(target).as_posix() not in manifest:
                    if not path.resolve().is_relative_to(target):
                        raise ValueError('Unexpected symlink in deployment target')
                    path.unlink()
        for relative in manifest:
            output = target / relative
            output.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(BUILD / relative, output)
        git(checkout, 'add', '--all', '--', 'lcs')
        changes = validate_checkout(checkout, manifest)
        record = {'repository': 'ToastmastersLee/q', 'site': SITE, 'previousCommit': previous,
                  'checkout': str(checkout), 'status': 'prepared', 'files': manifest,
                  'preservedBlobs': preserved, 'changedPaths': changes}
        write(deployment / 'deployment.json', record)
        write(VALIDATION / 'deployment.json', record)
        print(json.dumps({'checkout': str(checkout), 'previousCommit': previous,
                          'changedPaths': changes, 'preservedFiles': len(preserved)}, indent=2))
        return

    record_path = checkout.parent / 'deployment.json'
    record = json.loads(record_path.read_text(encoding='utf-8'))
    changes = validate_checkout(checkout, manifest)
    if git(checkout, 'rev-parse', 'HEAD') != record['previousCommit']:
        raise ValueError('Prepared checkout HEAD changed')
    remote = git(checkout, 'ls-remote', 'origin', 'refs/heads/main').split()[0]
    if remote != record['previousCommit']:
        raise ValueError('Remote main moved; prepare a fresh checkout without force-pushing')
    git(checkout, 'commit', '-m', 'Update LCS Web V2 options from device evidence and reviewed terminology')
    commit = git(checkout, 'rev-parse', 'HEAD')
    after = git(checkout, 'ls-tree', '-r', 'HEAD').splitlines()
    preserved = {line.split('\t', 1)[1]: line.split()[2] for line in after
                 if not line.split('\t', 1)[1].startswith('lcs/')}
    if preserved != record['preservedBlobs']:
        raise ValueError('Pre-existing public site files changed')
    git(checkout, 'push', 'origin', 'main')
    record.update(commit=commit, status='pushed_waiting_for_pages', changedPaths=changes,
                  preservedFilesUnchanged=len(preserved))
    write(record_path, record)
    write(VALIDATION / 'deployment.json', record)
    print(json.dumps({'commit': commit, 'site': SITE, 'status': record['status'],
                      'preservedFilesUnchanged': len(preserved)}, indent=2))


if __name__ == '__main__':
    main()
