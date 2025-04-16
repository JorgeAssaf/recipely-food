import { type MetadataRoute } from 'next'
import { allPosts } from 'content-collections'

import { recipesCategories } from '@/config/recipes'
import { absoluteUrl, slugify } from '@/lib/utils'

import { getRecipesAction } from './_actions/recipes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipesTransaction = await getRecipesAction({
    limit: 1000,
    offset: 0,
    sort: 'createdAt.desc',
  })
  const recipesRoute = recipesTransaction.items.map((recipe) => ({
    url: absoluteUrl(`/recipe/${slugify(recipe.name)}`),
    lastModified: new Date().toISOString(),
  }))

  const categoriesRoutes = recipesCategories.map((category) => ({
    url: absoluteUrl(`/category/${category.title}`),
    lastModified: new Date().toISOString(),
  }))
  const postsRoutes = allPosts.map((post) => ({
    url: absoluteUrl(`${post.slug}`),
    lastModified: new Date().toISOString(),
  }))
  const routes = [
    '',
    '/recipes',
    '/about',
    '/categories',
    '/blog',
    '/dashboard/account',
    '/dashboard/recipes/recipes/saved-recipes',
    '/dashboard/recipes/recipes/my-recipes',
    '/dashboard/recipes/new/recipe',
    '/dashboard/billing',
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))
  return [...routes, ...recipesRoute, ...categoriesRoutes, ...postsRoutes]
}
