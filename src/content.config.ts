import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    slug: z.string(),
    publishedAt: z.coerce.date(),
    keywords: z.string().optional(),
    private: z.boolean().optional().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional()
  })
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    slug: z.string(),
    tags: z.array(z.string()).optional().default([]),
    stack: z.array(z.string()).optional().default([]),
    status: z.string().optional(),
    duration: z.object({
      start: z.string(),
      end: z.string()
    }),
    links: z.object({
      website: z.string().optional(),
      repository: z.string().optional()
    }).optional().default({}),
    assets: z.object({
      screenshots: z.array(z.string()).optional().default([])
    }).optional().default({ screenshots: [] })
  })
});

export const collections = { posts, projects };
