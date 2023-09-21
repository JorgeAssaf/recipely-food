import { type SidebarNavItem } from '@/types/nav'

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      items: [
        {
          title: 'Account',
          href: '/dashboard/account',
          icon: 'user',
          items: [],
        },

        {
          title: 'Recipes',
          href: '/dashboard/recipes/your-recipes',
          icon: 'book',
          items: [],
        },

        {
          title: 'Billing',
          href: '/dashboard/billing',
          icon: 'creditCard',
          items: [],
        },
      ],
    },
  ],
}
