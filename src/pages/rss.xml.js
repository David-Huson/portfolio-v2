import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	// Astro 3 returns `undefined` for a collection with no entries yet.
	const posts = ((await getCollection('writing', ({ data }) => !data.draft)) ?? []).sort(
		(a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
	);

	return rss({
		title: 'David Huson — Writing',
		description: 'Notes on the systems I build and the problems that made them interesting.',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `/writing/${post.slug}/`,
		})),
	});
}
