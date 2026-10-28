import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';

const traverse = traverseModule.default;
const app = 'src/mockups/lcs-web-v2';
const read = name => JSON.parse(fs.readFileSync(name, 'utf8'));
const get = (obj, key) => key.split('.').reduce((v, k) => v?.[k], obj);
const dictionaries = { common: read(`${app}/i18n/common.json`) };
for (const name of fs.readdirSync(`${app}/i18n/pages`)) dictionaries[name.slice(0, -5)] = read(`${app}/i18n/pages/${name}`);
const files = fs.readdirSync(`${app}/components`, { recursive: true }).filter(f => f.endsWith('.jsx')).map(f => `${app}/components/${f}`);
const report = { missing: [], hardcoded: [], syntax: [] };
for (const file of files) {
  let ast;
  try { ast = parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] }); }
  catch (error) { report.syntax.push({ file, error: error.message }); continue; }
  const aliases = {};
  traverse(ast, {
    VariableDeclarator(p) {
      const n = p.node;
      if (n.init?.callee?.name !== 'useTranslation') return;
      const namespace = n.init.arguments[0]?.value || 'common';
      for (const property of n.id.properties || []) if (property.key.name === 't') aliases[property.value.name] = namespace;
    },
  });
  traverse(ast, {
    CallExpression(p) {
      const ns = aliases[p.node.callee.name], key = p.node.arguments[0]?.value;
      if (!ns || typeof key !== 'string') return;
      if (!get(dictionaries[ns]?.en, key) && !get(dictionaries.common.en, key)) {
        const fallback = p.node.arguments[1]?.value;
        report.missing.push({ file: path.basename(file), ns, key, fallback });
      }
    },
    JSXText(p) {
      const text = p.node.value.trim();
      if (/[\u4e00-\u9fff]/.test(text)) report.hardcoded.push({ file: path.basename(file), text });
    },
  });
}
fs.mkdirSync('docs/lcs-web-v2/validation', { recursive: true });
fs.writeFileSync('docs/lcs-web-v2/validation/source-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (report.syntax.length || report.missing.length) process.exitCode = 1;
