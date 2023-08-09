import { recipes } from "@/db/schema"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Recipely',
  description: 'A recipe sharing platform',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  sourceCode: 'github.com/Recipely-app/Recipely',
  ogImage: {},
  mainNav: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Recipes',
      url: '/recipes',
    },
    {
      name: 'Categories',
      url: '/categories',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Blog',
      url: '/blog',
    },
  ],
  recipeNav: recipes.category.enumValues.map((category) => ({
    name: category,
    url: `/recipes/${category}`,
  })),

  footerNav: [],
}
