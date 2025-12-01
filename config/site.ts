export type SiteConfig = typeof siteConfig
export const siteConfig = {
  name: 'Recipely',
  description:
    'Discover, create, and share delicious recipes with a vibrant community of food enthusiasts. Find inspiration for breakfast, lunch, dinner, and desserts. Save your favorite recipes, create shopping lists, and connect with home cooks from around the world.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  sourceCode: 'https://github.com/JorgeAssaf/recipely-food',
}
