import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origin = process.argv[2];
if (!origin || new URL(origin).protocol !== "https:")
  throw new Error("Pass the HTTPS preview origin.");
const routes = [
  "/",
  "/about/",
  "/projects/",
  "/writing/",
  "/projects/image-classifier/",
  "/projects/minesweeper/",
  "/projects/python-fsa-generator/",
  "/projects/python-lisp-fsa/",
  "/projects/recursive-descent-parser/",
  "/404.html",
  "/sitemap.xml",
  "/rss.xml",
  "/robots.txt",
  "/assets/files/Project_2_Report-compressed.pdf",
  "/assets/2D_convolution.mp4",
];
const feedback =
  '<script async data-explicit-opt-in="true" data-deployment-id="dpl_2K8PvLVnM55K7RxsY4g9Kqtr7G8F" src="https://vercel.live/_next-live/feedback/feedback.js"></script>';
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const checks = await Promise.all(
  routes.map(async (route) => {
    const response = await fetch(new URL(route, origin));
    const bytes = Buffer.from(await response.arrayBuffer());
    const file = route.endsWith("/") ? route + "index.html" : route;
    const local = await readFile(path.join(root, "dist", file));
    const isHtml = response.headers.get("content-type")?.includes("text/html");
    const text = isHtml ? bytes.toString("utf8") : "";
    const platformFeedbackScript = isHtml && text.endsWith(feedback);
    const applicationBytes = platformFeedbackScript
      ? Buffer.from(text.slice(0, -feedback.length))
      : bytes;
    return {
      route,
      status: response.status,
      bytes: bytes.length,
      platformFeedbackScript,
      rawMatchesLocalBuild: hash(bytes) === hash(local),
      matchesLocalBuild: hash(applicationBytes) === hash(local),
    };
  }),
);
for (const route of ["/writing/idempotent-sqs-pipeline/", "/missing-page/"]) {
  const response = await fetch(new URL(route, origin));
  checks.push({ route, status: response.status, expectedStatus: 404 });
}
const production = await fetch("https://me.davidhuson.dev");
const productionHtml = await production.text();
const productionStillPreviousDesign = productionHtml.includes(
  "Hello, my name is David Huson",
);
const failures = checks.filter(
  (c) =>
    c.status !== (c.expectedStatus ?? 200) || c.matchesLocalBuild === false,
);
// Vercel may normalize /404.html to its error handler, whose status is 404.
const finalFailures = failures.filter(
  (c) => !(c.route === "/404.html" && c.status === 404 && c.matchesLocalBuild),
);
const report = {
  checkedAt: new Date().toISOString(),
  origin,
  sourceCommit: "4644fc2",
  normalization:
    "Only the exact observed trailing Vercel feedback script is excluded from application-byte comparison.",
  checks,
  productionStatus: production.status,
  productionStillPreviousDesign,
  failures: finalFailures,
};
await writeFile(
  path.join(root, "docs/portfolio-validation/hosted-checks.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
if (finalFailures.length || !productionStillPreviousDesign)
  process.exitCode = 1;
