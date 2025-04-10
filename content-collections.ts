// src/content/config.ts
import { defineCollection, defineConfig, z } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'

const posts = defineCollection({
  name: 'posts',
  directory: 'src/content/posts',
  include: '*.mdx',

  schema: (z) => ({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .describe('The title of the post'),
    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
      })
      .describe('The description of the post'),
    date: z
      .string({
        required_error: 'Date is required',
        invalid_type_error: 'Date must be a string',
      })
      .describe('The date of the post'),
  }),
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc)
    return {
      ...doc,
      mdx,

      _id: doc._meta.filePath,
      slug: doc._meta.filePath.replace(/\.mdx$/, ''),
      slugAsParams: doc._meta.filePath
        .replace(/\.mdx$/, '')
        .replace(/\//g, '-'),
    }
  },
})

export default defineConfig({
  collections: [posts],
})
