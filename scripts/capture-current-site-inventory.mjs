import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');

function option(name, fallback) {
	const index = process.argv.indexOf(name);
	return index === -1 ? fallback : process.argv[index + 1];
}

const origin = option('--origin', 'https://www.davidhuson.dev').replace(/\/$/, '');
const outputPath = resolve(
	repositoryRoot,
	option('--output', 'docs/dav-17/source-and-route-inventory.json')
);

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const path = join(directory, entry.name);
			return entry.isDirectory() ? walk(path) : [path];
		})
	);

	return files.flat().sort();
}

function git(...args) {
	return execFileSync('git', args, {
		cwd: repositoryRoot,
		encoding: 'utf8',
	}).trim();
}

async function assetManifest() {
	const trackedAssets = git('ls-files', 'public')
		.split('\n')
		.filter(Boolean);

	return Promise.all(
		trackedAssets.map(async (path) => {
			const absolutePath = join(repositoryRoot, path);
			const [contents, metadata] = await Promise.all([readFile(absolutePath), stat(absolutePath)]);

			return {
				path,
				bytes: metadata.size,
				sha256: createHash('sha256').update(contents).digest('hex'),
			};
		})
	);
}

async function screenshotManifest() {
	const directory = join(repositoryRoot, 'docs/dav-17/screenshots');
	let files;
	try {
		files = (await walk(directory)).filter((path) => path.endsWith('.jpg'));
	} catch (error) {
		if (error.code === 'ENOENT') return [];
		throw error;
	}

	return Promise.all(
		files.map(async (path) => {
			const contents = await readFile(path);
			return {
				path: relative(repositoryRoot, path),
				bytes: contents.byteLength,
				sha256: createHash('sha256').update(contents).digest('hex'),
			};
		})
	);
}

function frontmatterBoolean(contents, field) {
	const match = contents.match(new RegExp(`^${field}:\\s*(true|false)\\s*$`, 'm'));
	return match?.[1] === 'true';
}

async function contentRoutes() {
	const projectDirectory = join(repositoryRoot, 'src/content/projects');
	const writingDirectory = join(repositoryRoot, 'src/content/writing');
	const projectFiles = (await walk(projectDirectory)).filter((path) => path.endsWith('.md'));
	const writingFiles = (await walk(writingDirectory)).filter((path) => path.endsWith('.md'));

	const projects = projectFiles.map((path) => ({
		path: `/projects/${relative(projectDirectory, path).replace(/\.md$/, '')}/`,
		source: relative(repositoryRoot, path),
	}));

	const writing = [];
	for (const path of writingFiles) {
		const contents = await readFile(path, 'utf8');
		if (!frontmatterBoolean(contents, 'draft')) {
			writing.push({
				path: `/writing/${relative(writingDirectory, path).replace(/\.md$/, '')}/`,
				source: relative(repositoryRoot, path),
			});
		}
	}

	return { projects, writing };
}

async function routes() {
	const generated = await contentRoutes();
	return [
		{ path: '/', source: 'src/pages/index.astro', visual: true },
		{ path: '/about/', source: 'src/pages/about.astro', visual: true },
		{ path: '/projects/', source: 'src/pages/projects.astro', visual: true },
		{ path: '/writing/', source: 'src/pages/writing.astro', visual: true },
		...generated.projects.map((route) => ({ ...route, visual: true })),
		...generated.writing.map((route) => ({ ...route, visual: true })),
		{ path: '/rss.xml', source: 'src/pages/rss.xml.js', visual: false },
		{ path: '/dav-17-missing-route', source: 'src/pages/404.astro', visual: false },
	];
}

function match(html, pattern) {
	return html.match(pattern)?.[1] ?? null;
}

async function inspectLiveRoute(route) {
	const requestedUrl = `${origin}${route.path}`;
	try {
		const response = await fetch(requestedUrl, { redirect: 'follow' });
		const contentType = response.headers.get('content-type');
		const body = await response.text();

		return {
			...route,
			requestedUrl,
			status: response.status,
			finalUrl: response.url,
			contentType,
			title: contentType?.includes('text/html')
				? match(body, /<title>([^<]*)<\/title>/i)
				: null,
			canonical: contentType?.includes('text/html')
				? match(body, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
				: null,
			analyticsIds: [...new Set(body.match(/G-[A-Z0-9]+/g) ?? [])],
		};
	} catch (error) {
		return { ...route, requestedUrl, error: error.message };
	}
}

const packageJson = JSON.parse(await readFile(join(repositoryRoot, 'package.json'), 'utf8'));
const routeDefinitions = await routes();
const liveRoutes = await Promise.all(routeDefinitions.map(inspectLiveRoute));
const environmentFiles = (await readdir(repositoryRoot))
	.filter((name) => /(^|\.)env($|\.)/.test(name))
	.sort();
const environmentVariableNames = {};
for (const name of environmentFiles) {
	const contents = await readFile(join(repositoryRoot, name), 'utf8');
	environmentVariableNames[name] = [
		...contents.matchAll(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)=/gm),
	].map((match) => match[1]);
}

const inventory = {
	capturedAt: new Date().toISOString(),
	origin,
	source: {
		repository: 'https://github.com/David-Huson/portfolio-v2',
		branch: git('branch', '--show-current'),
		commit: git('rev-parse', 'HEAD'),
		commitSubject: git('show', '-s', '--format=%s', 'HEAD'),
	},
	build: {
		framework: `Astro ${packageJson.dependencies.astro}`,
		installCommand: 'npm install (Vercel framework default)',
		buildCommand: packageJson.scripts.build,
		outputDirectory: 'dist (Astro framework default)',
	},
	environment: {
		localFilesAndVariableNames: environmentVariableNames,
		vercelProjectVariables: [],
	},
	routes: liveRoutes,
	assets: await assetManifest(),
	screenshots: await screenshotManifest(),
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(inventory, null, 2)}\n`);
console.log(relative(repositoryRoot, outputPath));
