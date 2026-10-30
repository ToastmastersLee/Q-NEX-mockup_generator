# GitHub Pages publishing guide for future AI sessions

Updated: 2026-10-30 (Asia/Shanghai). Audience: Codex, Gemini, Claude, or another coding agent with repository access.

Read this file before publishing a similar project. It documents the working LCS Web V2 process and how to adapt it. Reading this guide is not itself an instruction to publish. When the user explicitly requests publication, prepare, inspect, push, and verify the release without asking for the same authorization again. Follow the new project's repository instructions and the user's current destination requirements.

## 1. Establish the destination first

Keep maintenance source, local build output, and public deployment distinct:

| Item | Working LCS Web V2 reference |
| --- | --- |
| Local source repository | `D:\Github\IQ\mockup_generator` |
| Source remote | `git@github.com:ToastmastersLee/Q-NEX-mockup_generator.git` |
| Application source | `src/mockups/lcs-web-v2/` |
| Build configuration | `vite.lcs-web-v2.config.js` |
| Build command | `npm run build:lcs-web-v2` |
| Build output | `dist/lcs-web-v2/` |
| Deployment repository | `ToastmastersLee/q` |
| Deployment remote used by the script | `git@github-work:ToastmastersLee/q.git` |
| Pages configuration recorded for this deployment | Deploy from a branch → `main` → `/(root)` |
| Directory owned by this application | `lcs/` inside the public repository |
| Public application URL | `https://toastmasterslee.github.io/q/lcs/` |
| Publisher | [deploy_pages.py](../../scripts/lcs-web-v2/deploy_pages.py) |
| Public verifier | [verify_pages.py](../../scripts/lcs-web-v2/verify_pages.py) |
| Release and verification records | [validation/](validation/) |

The public repository root serves the existing architecture website. Its `lcs/` subdirectory serves LCS Web V2. The Pages source setting is the repository root, not `lcs/`. A source-repository push alone does not update this separately maintained public site.

These are reference values, not defaults for every project. For a new project, first resolve its source root, build command/output, public repository, branch, owned subdirectory, and final HTTPS URL. Inspect the actual repository and existing files before choosing a new subdirectory. If the user has not specified a destination and existing project records do not resolve it, ask one concise question about that missing destination.

## 2. Protect existing sites and local work

Before file writes or cloning, inspect the complete absolute path and its nearest existing parent. Confirm the repository with `git rev-parse --show-toplevel`. Read its `AGENTS.md`, applicable project instructions, README, build scripts, and existing deployment records. Run `git status --short`, `git branch --show-current`, and `git remote -v`.

For the shared `q` deployment, also read the current architecture publishing handoff when available:

`D:\Github\IQ\QNEXPreSaleToolBox\Emulators\PUBLISH_HANDOFF.md`

Preserve every file outside the application's owned directory, including `index.html`, `.nojekyll`, `README.md`, `CNAME` if present, `assets/`, `planners/`, `demos/`, and sibling applications. Do not replace the shared root with a new application's build or upload the entire source repository. Do not change repository visibility, rename repositories, or reconfigure an already working Pages site as part of an ordinary update.

Use an isolated deployment checkout. Record the public branch's previous commit and the Git blob IDs of all files outside the owned directory. Only obsolete build files inside the verified owned directory may be removed. Validate resolved deletion paths, including symlinks, before removing anything. Never force-push to resolve a moved remote branch.

## 3. Build the intended application

Use the project's existing package manager and lockfile. Install dependencies when needed; do not reinstall a working environment on every publication. In PowerShell, check `$LASTEXITCODE` after native commands and stop on failure. A later successful command must not hide an earlier failed build or check.

For LCS Web V2, from the source root:

```powershell
Set-Location -LiteralPath 'D:\Github\IQ\mockup_generator'
npm run check:lcs-web-v2
if ($LASTEXITCODE -ne 0) { throw 'V2 checks failed' }
python -X utf8 scripts/lcs-web-v2/verify-options.py
if ($LASTEXITCODE -ne 0) { throw 'Option verification failed' }
npm run build:lcs-web-v2
if ($LASTEXITCODE -ne 0) { throw 'V2 build failed' }
```

Use the existing conda Python. If `python` is the Microsoft Store alias, this machine's previously working explicit command is `C:/Users/jackding/Miniconda3/python.exe -X utf8`; verify that path before using it on another machine. Normal frontend builds do not require rereading or regenerating the Excel catalog. Run `generate_catalog.py` only when bindings, supplementary text, or the imported catalog have changed.

LCS uses `base: './'`, an isolated preview entry, `publicDir: false`, and a module guard that rejects other mockups in the bundle. Preserve that isolation. For another application, inspect its routing and assets before selecting its base. A fixed Vite deployment under `/q/example/` may use `/q/example/`; relative asset paths suit the existing LCS query-based routing. Do not copy `base: './'` blindly into an application with history-based routes. GitHub Pages does not automatically provide a backend or arbitrary SPA route fallback. Verify direct navigation and refresh. See the [Vite deployment reference](https://vite.dev/guide/static-deploy.html#github-pages).

Inspect the built directory: it must contain `index.html` and all referenced runtime assets. Keep credentials, real device URLs with credentials, internal documents, environment files, and unrelated applications out of the public bundle. A static frontend cannot keep embedded credentials secret. Review source maps separately before including them.

Use `npm run preview:lcs-web-v2` for a local production-build preview, or the equivalent command for the new application. Check relevant menus, dialogs, languages, asset loading, direct URL refresh, and representative desktop/narrow widths. Respect the session's browser tooling rules. Record any unavailable visual checks honestly. Reuse passing development checks unless something changed or a new failure justifies repeating them.

## 4. Create a manifest from the exact build

The LCS publisher requires `validation/release.json` to contain a `files` object mapping every build-relative path to its SHA-256. It rejects a build that differs from that manifest. An old manifest or ZIP must not be reused after rebuilding. The ZIP is an optional handover artifact; Git deployment copies the build directory.

After a successful build, run this from the verified LCS source root:

```powershell
@'
from pathlib import Path
from datetime import datetime, timezone
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib, json

root = Path.cwd().resolve()
assert root == Path('D:/Github/IQ/mockup_generator').resolve()
build = root / 'dist/lcs-web-v2'
records = root / 'docs/lcs-web-v2/validation'
assert build.is_dir() and records.is_dir()
assert (build / 'index.html').is_file()
files = {}
for path in sorted(build.rglob('*')):
    assert not path.is_symlink(), f'Unexpected build symlink: {path}'
    if path.is_file():
        files[path.relative_to(build).as_posix()] = hashlib.sha256(path.read_bytes()).hexdigest()
assert files
archive = root / 'dist/lcs-web-v2-pages.zip'
with ZipFile(archive, 'w', ZIP_DEFLATED) as package:
    for relative in files:
        package.write(build / relative, relative)
release = {
    'createdAt': datetime.now(timezone.utc).isoformat(),
    'site': 'https://toastmasterslee.github.io/q/lcs/',
    'files': files,
    'zip': str(archive),
    'zipSha256': hashlib.sha256(archive.read_bytes()).hexdigest(),
    'published': False,
}
(records / 'release.json').write_text(json.dumps(release, indent=2) + '\n', encoding='utf-8')
print(f'Release prepared: {len(files)} files')
'@ | python -X utf8 -
if ($LASTEXITCODE -ne 0) { throw 'Manifest generation failed' }
```

This creates a new unpublished release record. Do not carry a previous release's `published: true`, commit, workflow, or verification timestamp into it. Retain historical records separately if needed, after checking their destination paths. The expected file count comes from the current build; the previous release's 7-file count is not a permanent requirement.

## 5. Prepare the public checkout

Prefer existing HTTPS authentication when it works. Do not install a new authentication tool unnecessarily. This machine previously published through Windows OpenSSH over port 443 using its existing authorized GitHub identity:

```powershell
Set-Location -LiteralPath 'D:\Github\IQ\mockup_generator'
$env:GIT_SSH_COMMAND = 'C:/Windows/System32/OpenSSH/ssh.exe -o BatchMode=yes -o ConnectTimeout=10 -o ConnectionAttempts=1 -o HostName=ssh.github.com -o HostKeyAlias=github.com -p 443'
python -X utf8 scripts/lcs-web-v2/deploy_pages.py
if ($LASTEXITCODE -ne 0) { throw 'Deployment preparation failed' }
```

`github-work` is a local SSH configuration alias, not a repository name or universal GitHub hostname. Other machines must use their own authorized identity. Do not copy private keys or change global Git/SSH settings. Set the process-level `GIT_SSH_COMMAND` again in every separate shell invocation that needs it.

The script shallow-clones current `q/main` under a timestamped `dist/lcs-web-v2-deploy/.../checkout`, with checkout-local `core.autocrlf=false`. It records outside-directory blob IDs, copies the manifest build into `lcs/`, removes superseded owned files, and stages only `lcs/`. It prints the exact checkout path and writes `validation/deployment.json` with status `prepared`.

Inspect that exact returned checkout:

```powershell
# Replace this placeholder with the path actually returned by preparation.
$pagesCheckout = '<EXACT_PREPARED_CHECKOUT_PATH>'
git -C $pagesCheckout status --short
git -C $pagesCheckout diff --cached --stat
git -C $pagesCheckout diff --cached --name-only
```

All staged paths must be within `lcs/` for an LCS release. Check the HTML asset references, manifest match, and preservation results. The checkout must contain no unintended unstaged edits. If there are no application changes, do not manufacture a commit: confirm the existing deployed files match and report that no new release was necessary.

## 6. Push the inspected release

When publication is authorized and preparation passes:

```powershell
Set-Location -LiteralPath 'D:\Github\IQ\mockup_generator'
$env:GIT_SSH_COMMAND = 'C:/Windows/System32/OpenSSH/ssh.exe -o BatchMode=yes -o ConnectTimeout=10 -o ConnectionAttempts=1 -o HostName=ssh.github.com -o HostKeyAlias=github.com -p 443'
python -X utf8 scripts/lcs-web-v2/deploy_pages.py --publish --checkout '<EXACT_PREPARED_CHECKOUT_PATH>'
if ($LASTEXITCODE -ne 0) { throw 'Publish failed; inspect the checkout before retrying' }
```

Use the exact path from preparation, not a guessed old timestamp. The script checks the remote head has not moved, commits the staged application update, confirms outside-directory blobs are unchanged, and normally pushes `main`. It does not accept a `--ssh` flag. The successful stage is `pushed_waiting_for_pages`; this is not yet proof of a live update.

The current LCS script has a release-specific commit message. Adapt it for a different release when appropriate; never change unrelated files merely to match that message.

## 7. Verify the deployment, then the public website

```powershell
Set-Location -LiteralPath 'D:\Github\IQ\mockup_generator'
python -X utf8 scripts/lcs-web-v2/verify_pages.py
if ($LASTEXITCODE -ne 0) { throw 'Public verification incomplete; inspect the actual failure' }
```

The verifier checks the Pages workflow associated with the pushed commit, current public `main`, every manifest file fetched anonymously over HTTPS, six existing root/site entry files, and the `/q/lcs` → `/q/lcs/` redirect. A passing HTTP status alone is insufficient: compare SHA-256 against the release manifest. The Git preservation check and public-entry checks prove different things and should both be recorded.

If the workflow is pending, wait and recheck at a reasonable interval. Do not republish an already pushed release to make it deploy faster. After the file check passes, open the actual HTTPS site in a browser, test changed interactions, language switching and direct refresh, inspect console/resource errors, and check relevant layouts. Save available evidence using the session's supported tools. Clearly state any checks that could not be completed.

Record these distinct stages accurately:

| Status | Evidence required |
| --- | --- |
| `prepared` | Verified build/manifest and scoped staged checkout |
| `pushed_waiting_for_pages` | Successful push and actual public commit SHA |
| `public_bytes_verified_awaiting_browser` | Successful commit-specific Pages workflow and matching public files |
| `published_verified` | Public-file proof plus documented browser acceptance |

Only after those checks pass, update `release.json` with the actual public commit, workflow URL and verification time, and mark `published: true`. Update `deployment.json`, `public-file-verification.json`, `public-browser-verification.json`, and the project's README/handoff. Preserve the actual limits of browser acceptance rather than claiming complete hardware or device equivalence.

### GitHub API rate-limit fallback

An anonymous GitHub API 403 does not prove deployment failed. Use an authorized GitHub connector or an already-authenticated CLI to freshly read:

1. `GET /repos/ToastmastersLee/q/actions/runs?head_sha=<PUSHED_SHA>&per_page=10`
2. `GET /repos/ToastmastersLee/q/commits/main`

Save a minimal real response record with this shape; do not invent values or reuse an old success:

```json
{
  "fetchedAt": "<current UTC ISO timestamp>",
  "source": "<actual authorized tool used>",
  "headSha": "<current main SHA>",
  "workflow": {
    "id": 0,
    "name": "pages build and deployment",
    "head_sha": "<this release SHA>",
    "status": "completed",
    "conclusion": "success",
    "html_url": "<actual workflow run URL>"
  }
}
```

Replace the illustrative `id: 0` and every placeholder with the fetched values. Keep only the workflow for the actual release, then run:

```powershell
python -X utf8 scripts/lcs-web-v2/verify_pages.py --github-proof docs/lcs-web-v2/validation/github-publication-proof.json
if ($LASTEXITCODE -ne 0) { throw 'Public verification failed' }
```

The proof must be fresh (within 30 minutes), with matching workflow/head/release SHA. This fallback replaces only the API reads; the verifier still downloads and hashes the public website anonymously.

## 8. Adapt the process to another project

**Do not run the existing LCS publisher for another application unchanged: it owns and replaces `q/lcs/`.** Copy the workflow into separately named project tools and records, or use an existing publisher already scoped to the new project.

Resolve and validate every item below; simple global replacement of the application name is insufficient:

| Area | Required adaptation |
| --- | --- |
| Source/build | Repository root calculation, entry point, build command, build output and asset base |
| Records | Dedicated documentation, release manifest, verification reports and source snapshot paths |
| Deployment | Public remote, branch, allowed owned directory, public HTTPS URL and checkout parent |
| Publisher guards | Remote/branch checks, target boundary, staged-path prefix, preservation filters, all literal `lcs/` paths and commit message |
| Public verifier | API owner/repository, branch lookup, URL prefix, expected redirect and preservation entry list |
| Manifest code | Root assertion, build/records/ZIP paths and site URL |
| Shared-site maintenance | Every whole-site publisher must preserve the new subdirectory during future updates |
| Project checks | Use that application's meaningful checks; do not copy LCS Excel/options assertions into unrelated code |

Search the adapted files for leftover `lcs`, `lcs-web-v2`, `ToastmastersLee`, `/q/`, and `main`; review every occurrence against the intended target. A different branch name also requires adapting the verifier's `commits/main` lookup. If using the shared `q` repository, inspect a new directory for collisions before creating it and preserve existing `lcs/` alongside the other sites. Only integrate a new root-navigation link when requested or clearly required, and include that explicit exception in the preservation scope.

For an existing deployment, retain its publishing method. For a genuinely new repository, configure Pages once after confirming the intended destination. GitHub supports branch publication from the selected branch's root or `/docs`, or a custom Pages Actions workflow. With local prebuilt static files, the branch approach used here works; when building in Actions, set the correct build command, artifact directory and Pages permissions, and verify that workflow instead. Do not mix both approaches inadvertently. See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## 9. Recover from a failure at the failed stage

| Failure | Next action |
| --- | --- |
| Wrong/missing path | Inspect actual absolute components and both locations if disputed; do not create a guessed split path |
| Build/check failed | Fix the relevant failure; do not publish a stale previous build |
| Original-file hash baseline failed | Inspect actual differences and Git line endings; do not overwrite the historical baseline just to pass |
| Manifest mismatch | Recreate the manifest from the verified build and prepare again |
| Remote head moved before commit | Prepare against current remote state; no force push |
| Commit succeeded but push failed | Inspect checkout HEAD, staged/unstaged state and remote HEAD; retry the normal push of that exact verified commit if still valid, rather than blindly rerunning the publisher |
| Push outcome uncertain | Compare `git ls-remote` with local release SHA before any retry |
| Push succeeded, Pages pending | Wait/check the commit-specific workflow; do not rebuild or repush unchanged assets |
| Public hashes differ | Check workflow commit, public asset paths and caching; diagnose before preparing another release |
| Newer unrelated public commit exists | Inspect whether the owned application files are unchanged; the verifier intentionally refuses a stale head claim, so record that distinction and refresh preservation proof |
| Browser/screenshot unavailable | Record which DOM/layout/visual checks passed and which remain unverified |

Before a retry, read the existing deployment record and reuse its exact checkout when valid. No repository reset, broad cleanup, or force push is needed for an ordinary Pages release.

## 10. Source synchronization and handover

Publishing runtime files to `q` and pushing maintenance code to `Q-NEX-mockup_generator` are separate actions. When source synchronization is also requested, inspect the source remote, fetch, stage only intended code/docs/tools, review the staged diff, commit, and normally push the intended branch. Exclude dependencies, build/deployment checkouts, caches and credentials. Verify the remote SHA equals the local commit and report any remaining local changes. Do not use a broad add in a mixed workspace or force-add ignored files without a reason.

Historical reference only: LCS public release `f32ce40c089083d22265db9768c1cd64c14b1991` passed its [Pages workflow](https://github.com/ToastmastersLee/q/actions/runs/40870854726), with 7 public files matching and 144 outside-directory Git blobs preserved. The related source was pushed as `9bad74568405bb05ef5ced986b4986f0afb12259`. Verify current state before a new release; these SHAs are not instructions to reset or redeploy.

Report the actual URL, public commit, workflow result, public file verification, browser acceptance and limitations. Mention the source commit separately if pushed. Do not report “published” merely because a build, ZIP, source push, or public push succeeded.

## Copy this prompt into a new session

```text
Read D:\Github\IQ\mockup_generator\docs\lcs-web-v2\GITHUB-PAGES-PUBLISHING-GUIDE.md first.

Publish my project at [ABSOLUTE_SOURCE_PATH] to [PUBLIC_REPOSITORY], branch [BRANCH],
owned directory [SUBDIRECTORY], URL [HTTPS_SITE_URL].

Inspect the actual project/build/deployment configuration and apply the guide to this
project. Adapt the publisher and verifier into separate project tools if needed; do
not run the LCS publisher unchanged for a different application. Preserve existing
sites, build and verify the intended application, prepare and inspect the scoped
release, then commit/push and verify the actual Pages deployment and public files.
This request authorizes publication to that destination; do not ask again when the
destination and scope are already clear. Ask only for genuinely unresolved information.
Record the release and provide the live URL, commit, verification results and limits.
[Also push the maintenance source to its existing Git remote, if desired.]
```

Replace bracketed fields before use. If the user simply requests another LCS V2 update, the reference destination in section 1 resolves those fields; still inspect the live project state.
