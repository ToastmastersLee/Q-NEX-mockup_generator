import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const docs = 'docs/lcs-web-v2';
const app = 'src/mockups/lcs-web-v2';
const read = name => JSON.parse(fs.readFileSync(name, 'utf8'));
const get = (obj, key) => key.split('.').reduce((value, part) => value?.[part], obj);
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const files = root => fs.readdirSync(root, { recursive: true }).filter(name => fs.statSync(path.join(root, name)).isFile()).map(name => name.replaceAll('\\', '/'));
const baseline = read(`${docs}/legacy-baseline.json`);
const oldRoot = 'src/mockups/lcs-web';
assert.deepEqual(files(oldRoot).sort(), Object.keys(baseline).sort(), 'Legacy file list changed');
for (const [file, expected] of Object.entries(baseline)) assert.equal(hash(`${oldRoot}/${file}`), expected, `Legacy changed: ${file}`);

const catalog = {};
for (const file of fs.readdirSync(`${docs}/catalog`)) Object.assign(catalog, read(`${docs}/catalog/${file}`));
const source = read(`${docs}/source.json`);
assert.equal(Object.keys(catalog).length, source.entries);
assert.equal(new Set(Object.values(catalog).map(e => e.group)).size, 38);
let bound = 0, supplementary = 0;
for (const file of fs.readdirSync(`${docs}/bindings`)) {
  const namespace = file.slice(0, -5);
  const dictionary = read(`${app}/i18n/${namespace === 'common' ? 'common.json' : `pages/${file}`}`);
  const bindings = read(`${docs}/bindings/${file}`);
  for (const [key, factoryKey] of Object.entries(bindings)) {
    const expected = catalog[factoryKey];
    assert.ok(expected, `Missing factory key: ${factoryKey}`);
    for (const lang of ['en', 'zh']) assert.equal(get(dictionary[lang], key), expected[lang], `${namespace}.${key}/${lang}`);
    if (expected.status === 'pending') assert.equal(expected.en, expected.original, `Pending value changed: ${factoryKey}`);
    bound++;
  }
  for (const [key, value] of Object.entries(read(`${docs}/supplementary/${file}`))) {
    assert.ok(!bindings[key], `Duplicate supplemental key: ${namespace}.${key}`);
    assert.ok(value.reason);
    for (const lang of ['en', 'zh']) assert.equal(get(dictionary[lang], key), value[lang]);
    supplementary++;
  }
}

const output = read(`${app}/i18n/pages/output.json`).en;
assert.equal(output.compositeView, 'Compositing');
assert.equal(output.filmVideo, 'PGM');
assert.equal(output.modalTabFilm, 'Film Video');
assert.equal(read(`${app}/i18n/pages/main.json`).en.directorMode.semiAuto, 'Semi-auto');
const build = 'dist/lcs-web-v2';
if (fs.existsSync(`${build}/index.html`)) {
  for (const file of files(build)) assert.ok(!/\.(xlsx|md|py)$/.test(file), `Internal file in build: ${file}`);
  const html = fs.readFileSync(`${build}/index.html`, 'utf8');
  assert.ok(!/(?:src|href)="\//.test(html), 'Root-absolute asset URL in build');
}

const report = { legacyFilesUnchanged: Object.keys(baseline).length, factoryEntries: source.entries, boundControls: bound, supplementaryControls: supplementary, sourceSha256: source.sha256, result: 'passed' };
fs.mkdirSync(`${docs}/validation`, { recursive: true });
fs.writeFileSync(`${docs}/validation/integrity.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
await import('./audit-source.mjs');
