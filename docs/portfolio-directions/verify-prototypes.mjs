import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const require = createRequire(import.meta.url);
const modulePath = process.env.PLAYWRIGHT_MODULE || 'playwright';
const { chromium } = require(modulePath);
const root = path.dirname(fileURLToPath(import.meta.url));
const base = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4327';
await mkdir(path.join(root, 'screenshots'), { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const results = [];
const hubChecks = [];
try {
  for (const key of ['a', 'b', 'c', 'd']) {
    for (const view of ['home', 'case', 'system']) {
      for (const width of [320, 390, 768, 1440]) {
        const page = await browser.newPage({ viewport: { width, height: width < 500 ? 844 : 1050 }, reducedMotion: 'reduce' });
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
        await page.goto(`${base}/docs/portfolio-directions/${key}-${view}.html`);
        const check = await page.evaluate(() => {
          const text = document.body.innerText;
          const badImages = [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src);
          return { overflow: document.documentElement.scrollWidth > innerWidth, h1: document.querySelectorAll('h1').length, main: document.querySelectorAll('main').length, badImages, unresolved: /FLOW|KEY|lorem ipsum/.test(text), reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches };
        });
        await page.keyboard.press('Tab');
        const skip = await page.locator('.skip').evaluate(el => el === document.activeElement);
        if (view === 'case') {
          const detail = page.locator('details').first();
          await detail.locator('summary').focus();
          await page.keyboard.press('Enter');
          check.disclosure = await detail.evaluate(el => el.open);
          await page.keyboard.press('Enter');
          await page.locator('.skip').focus();
        }
        // Move focus away from page chrome before capturing the resting view.
        await page.locator('h1').click();
        await page.evaluate(() => scrollTo(0, 0));
        if ([390, 1440].includes(width)) {
          await page.screenshot({ path: path.join(root, 'screenshots', `${key}-${view}-${width}.png`), fullPage: true });
          if (view === 'home') await page.screenshot({ path: path.join(root, 'screenshots', `${key}-home-${width}-viewport.png`) });
        }
        results.push({ key, view, width, ...check, skip, errors });
        await page.close();
      }
    }
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${base}/docs/portfolio-directions/`);
  await page.getByRole('button', { name: 'Mobile previews' }).click();
  const mobileToggle = await page.locator('.grid').evaluate(el => el.classList.contains('phone'));
  await page.getByRole('button', { name: 'Desktop previews' }).click();
  const desktopToggle = await page.locator('.grid').evaluate(el => !el.classList.contains('phone'));
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const mode of ['Mobile previews', 'Desktop previews']) {
      await page.getByRole('button', { name: mode }).click();
      await page.evaluate(() => new Promise(requestAnimationFrame));
      hubChecks.push({ width, mode, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) });
    }
  }
  await page.screenshot({ path: path.join(root, 'screenshots', 'comparison.png'), fullPage: true });
  const failed = results.filter(r => r.overflow || r.h1 !== 1 || r.main !== 1 || r.badImages.length || r.unresolved || !r.skip || r.errors.length || r.disclosure === false);
  const report = { checkedAt: new Date().toISOString(), note: 'Prototype checks, not a production accessibility certification or Core Web Vitals measurement.', viewports: [320, 390, 768, 1440], mobileToggle, desktopToggle, hubChecks, pages: results, failed };
  await writeFile(path.join(root, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ configurations: results.length, failures: failed, mobileToggle, desktopToggle, hubChecks }, null, 2));
  if (failed.length || !mobileToggle || !desktopToggle || hubChecks.some(r => r.overflow)) process.exitCode = 1;
} finally { await browser.close(); }
