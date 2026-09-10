import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const args = process.argv.slice(2);
const option = (name) => args.includes(name) ? args[args.indexOf(name) + 1] : undefined;
const origin = option('--origin') ?? 'https://me.davidhuson.dev';
const redirectOrigin = option('--redirect-origin');
const original = args.includes('--original');
const inventory = JSON.parse(await readFile(new URL('../docs/dav-17/source-and-route-inventory.json', import.meta.url), 'utf8'));
const results = [];
async function request(path, base = origin, redirect = 'follow') {
  const response = await fetch(new URL(path, base), { redirect, signal: AbortSignal.timeout(20000) });
  return response;
}

for (const route of inventory.routes) {
  const response = await request(route.path);
  assert.equal(response.status, route.status, route.path);
  const html = await response.text();
  if (route.visual) {
    assert.ok(html.includes(`<title>${route.title}</title>`), `Title: ${route.path}`);
    if (!original) {
      const canonical = new URL(route.path, 'https://me.davidhuson.dev').href;
      assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `Canonical: ${route.path}`);
      assert.ok(html.includes(`property="og:url" content="${canonical}"`), `Open Graph: ${route.path}`);
    }
  }
  if (route.path === '/rss.xml') {
    assert.ok(html.includes(original ? 'www.davidhuson.dev' : 'me.davidhuson.dev'), 'RSS origin');
  }
  if (route.path === '/') assert.ok(html.includes('mailto:dhuson@davidhuson.dev'), 'Email contact');
  results.push({ path: route.path, status: response.status, finalUrl: response.url });
}
for (const asset of inventory.assets) {
  const response = await request(asset.path.replace(/^public/, ''));
  assert.equal(response.status, 200, asset.path);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.path);
}
if (!original) {
  const sitemap = await request('/sitemap.xml');
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  for (const route of inventory.routes.filter((route) => route.visual)) {
    assert.ok(xml.includes(`<loc>https://me.davidhuson.dev${route.path}</loc>`), `Sitemap: ${route.path}`);
  }
  assert.equal((xml.match(/<loc>/g) ?? []).length, 9, 'No unpublished writing in sitemap');
  const robots = await request('/robots.txt');
  assert.equal(robots.status, 200);
  assert.ok((await robots.text()).includes('Sitemap: https://me.davidhuson.dev/sitemap.xml'));
}
if (redirectOrigin) {
  const paths = inventory.routes.filter((route) => route.status === 200 && route.path !== '/').map((route) => route.path.replace(/\/$/, ''));
  paths.push('/assets/files/Project_2_Report-compressed.pdf', '/assets/2D_convolution.mp4');
  for (const path of paths) {
    const response = await request(`${path}?migration_check=1`, redirectOrigin, 'manual');
    assert.equal(response.status, 308, `Redirect: ${path}`);
    assert.equal(response.headers.get('location'), `https://me.davidhuson.dev${path}?migration_check=1`, path);
    const target = await fetch(response.headers.get('location'), { signal: AbortSignal.timeout(20000) });
    assert.equal(target.status, 200, `Redirect destination: ${path}`);
    results.push({ path, status: response.status, location: response.headers.get('location') });
  }
  for (const path of ['/dav-20-missing-route', '/projects/not-a-real-project', '/writing/unpublished-article']) {
    const response = await request(path, redirectOrigin, 'manual');
    assert.equal(response.status, 404, `Unknown route: ${path}`);
  }
  const home = await request('/', redirectOrigin);
  assert.equal(home.status, 200);
  assert.ok((await home.text()).includes('Coming soon'), 'Waitlist homepage remains active');
}
const report = { checkedAt: new Date().toISOString(), origin, redirectOrigin, original, assetHashesVerified: inventory.assets.length, results };
if (option('--output')) await writeFile(option('--output'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
