import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional()
  })
});

export const collections = { posts };
