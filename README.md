# Recipely - Modern Recipe Web App

![Recipely Logo](https://media.licdn.com/dms/image/v2/D4D2DAQHSSk_O88mKLw/profile-treasury-image-shrink_800_800/profile-treasury-image-shrink_800_800/0/1713987054221?e=1745892000&v=beta&t=MeY5D_bqMa3LcdTRNPUkmjqTWKog_La00Qj6E2bXwqc)  
**Live Demo**: [recipely-food.vercel.app](https://recipely-food.vercel.app)

## 🍳 Features

- Explore thousands of recipes with beautiful visuals
- Advanced search with filters (diet, cook time, difficulty)
- Save favorites and create collections
- Responsive design (mobile, tablet & desktop)
- Dark/light mode support
- Upload your own recipes with images

## 🛠️ Tech Stack

### Frontend

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Zod**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Radix UI**
- **Uploadthing**

### Backend

- **Drizzle ORM** – TypeScript-first SQL query builder
- **PostgreSQL** – Relational database for recipes/user data

### Deployment

- **Vercel** – Edge Network, Serverless Functions

## 🚀 Local Setup

1. Clone the repo:

```bash
git clone https://github.com/JorgeAssaf/recipely-food.git
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables (create `.env.local`):

```env
DATABASE_URL_MYSQL
DATABASE_URL
UPLOADTHING_URL
UPLOADTHING_SECRET
UPLOADTHING_APP_ID
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_APP_URL
UPLOADTHING_TOKEN
```

4. Run the dev server:

```bash
npm run dev
```

## 🌟 Why This Stack?

- **Next.js 15** enables partial prerendering for optimal performance
- **Drizzle + PostgreSQL** provides full type safety from database to UI
- **Uploadthing** makes file/image uploads simple and secure
- **shadcn/ui** offers beautiful, accessible components without CSS bloat
- **Tailwind v4** leverages CSS-native variables for theming

In future versions, we plan to:

- Integrate Nuqs for improved URL parameter and query string management
- Redesign all project pages with a more modern and intuitive interface
- Introduce advanced search filters (such as cuisine type and specific ingredients)
- Implement email notifications for users (e.g., recipe updates, favorites)
