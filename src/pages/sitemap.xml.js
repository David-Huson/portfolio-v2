import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const projects = (await getCollection('projects')) ?? [];
  const writing = (await getCollection('writing', ({ data }) => !data.draft)) ?? [];
  const paths = [
    '/', '/about/', '/projects/', '/writing/',
    ...projects.map((entry) => `/projects/${entry.slug}/`),
    ...writing.map((entry) => `/writing/${entry.slug}/`),
  ];
  const urls = paths.map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
