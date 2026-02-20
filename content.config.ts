import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        description2: z.string()
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        order: z.number(),
        title: z.string(),
        shortDescription: z.string(),
        description: z.string(),
        image: z.string(),
        toggleUrl: z.string(),
        toggleText: z.string(),
        popupImage: z.string(),
        preview: z.string(),
        isDraft: z.boolean()
      })
    })
  }
})