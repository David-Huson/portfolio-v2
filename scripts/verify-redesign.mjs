import { createRequire } from "node:module";
import { readFile, readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "docs/portfolio-validation");
const origin = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:4329";
const axePath = process.env.AXE_PATH;
const routes = [
  "/",
  "/projects/",
  "/about/",
  "/writing/",
  "/projects/recursive-descent-parser/",
  "/projects/python-lisp-fsa/",
  "/projects/image-classifier/",
  "/projects/minesweeper/",
  "/projects/python-fsa-generator/",
  "/404.html",
];
await mkdir(path.join(out, "screenshots"), { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
});
const checks = [],
  issues = [],
  accessibility = [],
  requests = new Set();
try {
  for (const route of routes) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      const page = await browser.newPage({
        viewport: { width, height: 950 },
        reducedMotion: "reduce",
      });
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("request", (r) => requests.add(r.url()));
      const response = await page.goto(origin + route);
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll("h1").length,
        main: document.querySelectorAll("main").length,
        canonical: document.querySelector("link[rel=canonical]")?.href,
        title: document.title,
        description: document.querySelector("meta[name=description]")?.content,
        og: document.querySelector('meta[property="og:description"]')?.content,
        scripts: document.scripts.length,
        brokenImages: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
        drafts: /\[TODO:|Proposed professional story|53 GB|70%/.test(
          document.body.innerText,
        ),
        links: [...document.querySelectorAll("a[href]")].map((a) => a.href),
      }));
      await page.keyboard.press("Tab");
      const skip = await page
        .locator(".skip")
        .evaluate((el) => document.activeElement === el);
      if (await page.locator("details").count()) {
        const details = page.locator("details").first();
        await details.locator("summary").focus();
        await page.keyboard.press("Enter");
        result.disclosure = await details.evaluate((el) => el.open);
        await page.keyboard.press("Enter");
      }
      if (width === 390 && axePath) {
        await page.addScriptTag({ path: axePath });
        const audit = await page.evaluate(async () => {
          const result = await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          });
          return result.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          }));
        });
        accessibility.push({ route, violations: audit });
        if (audit.length) issues.push({ route, width, axe: audit });
      }
      if (
        ["/", "/projects/recursive-descent-parser/", "/about/"].includes(
          route,
        ) &&
        [390, 1440].includes(width)
      ) {
        await page.locator("h1").click();
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({
          path: path.join(
            out,
            "screenshots",
            `${route === "/" ? "home" : route.split("/").filter(Boolean).pop()}-${width}.png`,
          ),
          fullPage: true,
        });
      }
      // Increase every element's computed text size, rather than merely scaling a screenshot.
      if (width === 390 || width === 1440) {
        result.enlargedOverflow = await page.evaluate(() => {
          const sizes = [...document.querySelectorAll("body *")].map((el) => [
            el,
            getComputedStyle(el).fontSize,
          ]);
          for (const [el, size] of sizes)
            el.style.fontSize = `${parseFloat(size) * 2}px`;
          return document.documentElement.scrollWidth > innerWidth;
        });
      }
      const check = {
        route,
        width,
        status: response.status(),
        ...result,
        skip,
        errors,
      };
      checks.push(check);
      if (
        result.overflow ||
        result.enlargedOverflow ||
        result.h1 !== 1 ||
        result.main !== 1 ||
        !result.description ||
        result.og !== result.description ||
        !result.canonical?.startsWith("https://me.davidhuson.dev/") ||
        result.scripts ||
        result.brokenImages.length ||
        result.drafts ||
        !skip ||
        errors.length ||
        result.disclosure === false
      )
        issues.push(check);
      await page.close();
    }
  }
  // All built links are checked once; no requests to third-party profile sites.
  const context = await browser.newContext();
  const localLinks = [...new Set(checks.flatMap((c) => c.links))].filter(
    (href) => href.startsWith(origin),
  );
  const linkChecks = [];
  for (const href of localLinks) {
    const url = new URL(href);
    url.hash = "";
    const response = await context.request.get(url.href);
    if (response.status() !== 200)
      issues.push({ link: href, status: response.status() });
    linkChecks.push({ href, status: response.status() });
  }
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(origin);
  await noJsPage
    .getByRole("link", { name: "Read the case study", exact: false })
    .click();
  await noJsPage.locator("summary").click();
  const noJsWorks =
    (await noJsPage.locator("details").first().getAttribute("open")) !== null;
  if (!noJsWorks) issues.push({ noJsWorks });
  for (const route of [
    "/writing/idempotent-sqs-pipeline/",
    "/does-not-exist/",
  ]) {
    const response = await context.request.get(origin + route);
    if (response.status() !== 404)
      issues.push({ route, expected: 404, status: response.status() });
  }
  const sitemap = await (
    await context.request.get(origin + "/sitemap.xml")
  ).text();
  const rss = await (await context.request.get(origin + "/rss.xml")).text();
  if (
    /idempotent-sqs|postgres-over-snowflake/.test(sitemap + rss) ||
    !sitemap.includes("https://me.davidhuson.dev/")
  )
    issues.push({ feed: "draft or origin failure" });
  const files = await readdir(path.join(root, "dist/_astro"));
  const home = await readFile(path.join(root, "dist/index.html"));
  const css = await Promise.all(
    files
      .filter((f) => f.endsWith(".css"))
      .map(async (f) => ({
        file: f,
        bytes: (await stat(path.join(root, "dist/_astro", f))).size,
      })),
  );
  const stats = {
    homeHtmlBytes: home.length,
    homeHtmlGzipBytes: gzipSync(home).length,
    css,
    emittedJavaScript: files.filter((f) => f.endsWith(".js")),
    thirdPartyRequests: [...requests].filter((url) => !url.startsWith(origin)),
    noJsWorks,
  };
  const report = {
    checkedAt: new Date().toISOString(),
    origin,
    checks,
    accessibility,
    linkChecks,
    stats,
    issues,
    limitations:
      "Local Chromium checks and axe are not a screen-reader certification or field Core Web Vitals measurement. Enlarged-text test doubles computed font sizes.",
  };
  await writeFile(
    path.join(out, "browser-checks.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      {
        configurations: checks.length,
        axePages: accessibility.length,
        stats,
        issues,
      },
      null,
      2,
    ),
  );
  if (issues.length) process.exitCode = 1;
} finally {
  await browser.close();
}
