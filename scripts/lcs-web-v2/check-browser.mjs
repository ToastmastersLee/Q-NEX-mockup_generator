// Run with Playwright available, or set LCS_PLAYWRIGHT_MODULE to its index.mjs URL.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.LCS_PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await context.newPage();
const base = process.env.LCS_PREVIEW_URL || 'http://localhost:5180/';
const out = 'docs/lcs-web-v2/validation';
fs.mkdirSync(`${out}/img`, { recursive: true });
const pages = ['main', 'recordings', 'subtitle', 'logo', 'titletrailer', 'osd', 'record', 'live', 'videomatting', 'interaction', 'broadcast', 'ip', 'system', 'version', 'input', 'output', 'audio', 'ptz', 'upload', 'storage', 'platform', 'peripheral', 'powersupply', 'factory', 'usermanagement', 'tracker', 'guidingstrategy', 'trackerdebug'];
const report = { base, pages: [], errors: [], missing: [], externalRequests: [], scenarios: [] };
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', message => {
  if (message.text().includes('[i18n missing]')) report.missing.push(message.text());
  if (message.type() === 'error') report.errors.push(message.text());
});
page.on('request', request => {
  if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== new URL(base).origin) report.externalRequests.push(request.url());
});

async function open(name, lang = 'en') {
  await page.goto(`${base}?page=${name}&lang=${lang}`);
  await page.locator('#root main').waitFor();
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

try {
  for (const width of [1920, 1366]) {
    await page.setViewportSize({ width, height: width === 1920 ? 1080 : 768 });
    for (const lang of ['en', 'zh']) for (const name of pages) {
      await open(name, lang);
      const metrics = await page.evaluate(() => {
        const visible = e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
        const selects = [...document.querySelectorAll('select')].filter(visible).map(e => ({
          value: e.value, valid: [...e.options].some(o => o.value === e.value),
          duplicateValues: [...e.options].map(o => o.value).filter((v, i, a) => a.indexOf(v) !== i),
        }));
        const clippedButtons = [...document.querySelectorAll('button')].filter(visible).filter(e => e.scrollWidth > e.clientWidth + 2).map(e => e.innerText);
        const text = document.body.innerText.replace(/中文\(简体\)/g, '');
        const chineseInEnglish = (text.match(/[\u4e00-\u9fff]{2,}/g) || []).slice(0, 20);
        return { selects, clippedButtons, chineseInEnglish, brokenImages: [...document.images].filter(e => !e.complete || !e.naturalWidth).map(e => e.src), documentOverflow: document.documentElement.scrollWidth > innerWidth + 2 };
      });
      report.pages.push({ name, width, lang, ...metrics });
      if (['main', 'output', 'subtitle', 'guidingstrategy'].includes(name) && lang === 'en') await page.screenshot({ path: `${out}/img/${name}-${width}-en.jpg`, quality: 78 });
    }
  }

  await page.setViewportSize({ width: 1920, height: 1080 });
  await open('output');
  const outputSelects = page.locator('.lcs-web-output-page select');
  await outputSelects.nth(1).selectOption('filmVideo');
  await page.locator('.lcs-web-language-select').selectOption('zh');
  assert.equal(await outputSelects.nth(1).inputValue(), 'filmVideo');
  await page.screenshot({ path: `${out}/img/output-1920-zh.jpg`, quality: 78 });
  await page.locator('.lcs-web-language-select').selectOption('en');
  assert.match(await page.locator('.lcs-web-output-page').innerText(), /Output Settings/);
  for (let output = 0; output < 2; output++) {
    await page.getByRole('button', { name: 'Display Settings', exact: true }).nth(output).click();
    const dialog = page.getByRole('dialog');
    assert.match(await dialog.innerText(), /Film Video/);
    await dialog.getByRole('button', { name: 'HDMI Output', exact: true }).click();
    assert.equal(await dialog.locator('input[type=range]').count(), 4);
    if (output === 0) await page.screenshot({ path: `${out}/img/output-display-en.jpg`, quality: 78 });
    await dialog.getByRole('button', { name: 'Close', exact: true }).click();
    await page.locator('.lcs-web-output-page').getByRole('button', { name: 'Audio Settings', exact: true }).nth(output).click();
    assert.match(await page.getByRole('dialog').innerText(), /REC/);
    if (output === 0) await page.screenshot({ path: `${out}/img/output-audio-en.jpg`, quality: 78 });
    await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).click();
  }
  report.scenarios.push('HDMI 1/2 display tabs, four sliders, audio dialogs; locale selection stability');

  await open('subtitle');
  assert.equal(await page.locator('.lcs-web-subtitle-page select').first().locator('option').count(), 6);
  const mode = page.locator('.lcs-web-subtitle-page select').last();
  await mode.selectOption('scrollRight');
  await page.locator('.lcs-web-language-select').selectOption('zh');
  assert.equal(await mode.inputValue(), 'scrollRight');
  await page.locator('.lcs-web-subtitle-page input[type=text]').last().fill('Customer preview');
  await page.locator('.lcs-web-language-select').selectOption('en');
  assert.equal(await page.locator('.lcs-web-subtitle-page input[type=text]').last().inputValue(), 'Customer preview');
  report.scenarios.push('Six font options; Static/Scroll Left/Scroll Right; custom text survives locale switch');

  await open('tracker');
  assert.equal(await page.locator('option[value=protocol4]').count(), 2);
  await page.locator('.lcs-web-tracker-page select').first().selectOption('protocol4');
  await page.locator('.lcs-web-language-select').selectOption('zh');
  assert.equal(await page.locator('.lcs-web-tracker-page select').first().inputValue(), 'protocol4');
  report.scenarios.push('Both tracking protocols include Protocol 4 and preserve selection');

  await open('upload');
  await page.getByRole('button', { name: /^Continuous/ }).click();
  await page.getByRole('option', { name: 'Scheduled', exact: true }).click();
  assert.equal(await page.locator('#upload-duration').inputValue(), '60');
  await page.locator('#upload-duration').fill('5');
  await page.locator('.lcs-web-upload-page').getByRole('button', { name: 'OK', exact: true }).click();
  assert.match(await page.locator('.lcs-web-toast').innerText(), /at least 10/);
  await page.locator('.lcs-web-language-select').selectOption('zh');
  assert.equal(await page.locator('#upload-duration').inputValue(), '5');
  await page.locator('.lcs-web-language-select').selectOption('en');
  await page.getByRole('button', { name: /^Standard FTP upload/ }).click();
  await page.getByRole('option', { name: 'Upload to the third-party centralized control platform', exact: true }).click();
  await page.screenshot({ path: `${out}/img/upload-scheduled-en.jpg`, quality: 78 });
  report.scenarios.push('Scheduled upload fields and minimum duration; long upload option; locale preserves input');

  await open('usermanagement');
  await page.getByRole('button', { name: 'Add User', exact: true }).click();
  await page.locator('#preview-account').fill('reviewer');
  await page.locator('#preview-password').fill('demo123');
  await page.locator('#preview-confirm-password').fill('wrong');
  await page.getByRole('dialog').getByRole('button', { name: 'OK', exact: true }).click();
  assert.match(await page.getByRole('alert').innerText(), /do not match/);
  await page.locator('#preview-confirm-password').fill('demo123');
  await page.getByRole('dialog').getByRole('button', { name: 'OK', exact: true }).click();
  assert.equal(await page.getByRole('cell', { name: 'reviewer', exact: true }).count(), 1);
  await page.getByRole('button', { name: 'View', exact: true }).first().click();
  await page.screenshot({ path: `${out}/img/users-details-en.jpg`, quality: 78 });
  await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).click();
  await page.getByRole('button', { name: 'Update Password', exact: true }).first().click();
  assert.equal(await page.locator('#preview-old-password').count(), 1);
  await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).click();
  report.scenarios.push('Add User validation and local insertion; Online Details and Update Password dialogs');

  await open('videomatting');
  await page.getByRole('button', { name: 'Chroma Key', exact: true }).first().click();
  await page.locator('#key-color').selectOption('blue');
  await page.locator('#key-enabled').check();
  assert.equal(await page.locator('#key-color').isDisabled(), true);
  await page.locator('#key-scene-name').fill('Demo Scene');
  await page.screenshot({ path: `${out}/img/chroma-key-en.jpg`, quality: 78 });
  await page.getByRole('dialog').getByRole('button', { name: 'Save', exact: true }).click();
  assert.equal(await page.getByText('Demo Scene', { exact: true }).count(), 2);
  report.scenarios.push('Chroma Key scene editor; Blue/Green choices; disable color change while keying is on');

  await open('output');
  await page.getByRole('button', { name: 'Text Overlays', exact: true }).click();
  assert.equal(new URL(page.url()).searchParams.get('page'), 'subtitle');
  await page.reload();
  assert.match(await page.locator('.lcs-web-subtitle-page').innerText(), /Text Overlays/);
  await page.goBack();
  assert.equal(await page.locator('.lcs-web-output-page').count(), 1);
  report.scenarios.push('Menu URL synchronization, reload and browser Back');
} finally {
  report.errors = [...new Set(report.errors)];
  report.missing = [...new Set(report.missing)];
  report.externalRequests = [...new Set(report.externalRequests)];
  fs.mkdirSync(`${out}/pages`, { recursive: true });
  for (const name of pages) fs.writeFileSync(`${out}/pages/${name}.json`, JSON.stringify(report.pages.filter(p => p.name === name), null, 2) + '\n');
  const issueViews = report.pages.filter(p => p.brokenImages.length || p.documentOverflow || p.clippedButtons.length || p.selects.some(s => !s.valid || s.duplicateValues.length) || (p.lang === 'en' && p.chineseInEnglish.length));
  fs.writeFileSync(`${out}/browser.json`, JSON.stringify({ ...report, pages: undefined, views: report.pages.length, issueViews: issueViews.map(p => `${p.name}/${p.width}/${p.lang}`) }, null, 2) + '\n');
  await browser.close();
}

const issues = report.pages.filter(p => p.brokenImages.length || p.documentOverflow || p.clippedButtons.length || p.selects.some(s => !s.valid || s.duplicateValues.length) || (p.lang === 'en' && p.chineseInEnglish.length));
console.log(JSON.stringify({ views: report.pages.length, scenarios: report.scenarios, errors: report.errors, missing: report.missing, externalRequests: report.externalRequests, issues }, null, 2));
assert.equal(report.errors.length, 0, 'Browser errors');
assert.equal(report.missing.length, 0, 'Missing translations');
assert.equal(report.externalRequests.length, 0, 'Unexpected external requests');
assert.equal(issues.length, 0, 'View validation issues');
