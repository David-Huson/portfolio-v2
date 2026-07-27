import { defineCollection, z } from 'astro:content';

export const collections = {
	projects: defineCollection({
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
			archived: z.boolean().default(false),
		}),
	}),
	writing: defineCollection({
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()),
			draft: z.boolean().default(true),
		}),
	}),
};
