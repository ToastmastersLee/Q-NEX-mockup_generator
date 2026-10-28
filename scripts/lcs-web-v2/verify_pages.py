"""Verify this commit's Pages workflow, anonymous site bytes and unchanged entries."""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'docs/lcs-web-v2/validation'


def get(url):
    request = Request(url, headers={'User-Agent': 'LCS-Web-Pages-Verification', 'Cache-Control': 'no-cache'})
    with urlopen(request, timeout=45) as response:
        return response.status, response.read(), response.url


def main():
    record = json.loads((OUT / 'deployment.json').read_text(encoding='utf-8'))
    api = 'https://api.github.com/repos/ToastmastersLee/q'
    _, body, _ = get(api + '/actions/runs?head_sha=' + record['commit'] + '&per_page=10')
    runs = [run for run in json.loads(body)['workflow_runs'] if 'pages' in run['name'].lower()]
    if not runs or runs[0]['status'] != 'completed' or runs[0]['conclusion'] != 'success':
        raise RuntimeError('This commit has not completed a successful Pages deployment')
    _, body, _ = get(api + '/commits/main')
    if json.loads(body)['sha'] != record['commit']:
        raise RuntimeError('Public main moved after this deployment')

    def check(item):
        relative, expected = item
        status, body, url = get(record['site'] + relative)
        actual = hashlib.sha256(body).hexdigest()
        return {'path': relative, 'url': url, 'status': status, 'sha256': actual, 'matches': actual == expected}

    with ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(check, record['files'].items()))
    existing = []
    entries = ['index.html', 'README.md', 'planners/lcs/index.html', 'planners/dante/index.html', 'demos/lcs/index.html', 'demos/dante/index.html']
    for path in entries:
        expected = record['preservedBlobs'][path]
        status, body, url = get('https://toastmasterslee.github.io/q/' + path)
        git_hash = hashlib.sha1(f'blob {len(body)}\0'.encode() + body).hexdigest()
        existing.append({'path': path, 'status': status, 'gitBlob': git_hash, 'matches': expected == git_hash})
    status, body, canonical = get('https://toastmasterslee.github.io/q/lcs')
    canonical_ok = canonical == record['site'] and hashlib.sha256(body).hexdigest() == record['files']['index.html']
    report = {'verifiedAt': datetime.now(timezone.utc).isoformat(), 'commit': record['commit'],
              'workflow': runs[0]['html_url'], 'files': results, 'existingEntries': existing,
              'slashRedirect': {'status': status, 'url': canonical, 'matches': canonical_ok},
              'preservedFilesInGit': record['preservedFilesUnchanged']}
    (OUT / 'public-file-verification.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    if not canonical_ok or not all(v['matches'] for v in results + existing):
        raise RuntimeError('Public bytes do not match; see public-file-verification.json')
    record.update(status='public_bytes_verified_awaiting_browser', workflow=runs[0]['html_url'],
                  publicFilesMatched=len(results), publicVerifiedAt=report['verifiedAt'])
    (OUT / 'deployment.json').write_text(json.dumps(record, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'site': record['site'], 'commit': record['commit'], 'workflow': record['workflow'],
                      'newFilesMatched': len(results), 'existingEntryChecks': len(existing), 'slashRedirect': canonical_ok}, indent=2))


if __name__ == '__main__':
    main()
