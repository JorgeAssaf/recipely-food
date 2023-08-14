import { recipes } from '@/db/schema'

import { MainNavItem } from '@/types/nav'
import { slugify } from '@/lib/utils'

import { recipesCategories } from './recipes'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Recipely',
  description: 'A recipe sharing platform',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  sourceCode: 'github.com/Recipely-app/Recipely',
  ogImage: {},
  MainNavItem: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Recipes',
      href: '/recipes',
    },
    {
      title: 'Categories',
      href: '/categories',
      items: [
        ...recipesCategories.map((category) => ({
          title: category.title,
          href: `/categories/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: [],
        })),
      ],
    },

    {
      title: 'About',
      href: '/about',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
  ] satisfies MainNavItem[],

  recipeNav: recipes.category.enumValues.map((category) => ({
    title: category,
    href: `/recipes/${category}`,
  })),

  footerNav: [],
}
