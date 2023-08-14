
import { type SidebarNavItem } from '@/types/nav'

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: 'Account',
      href: '/dashboard/account',
      icon: 'User2',
      items: [],
    },
    {
      title: 'Recipes',
      href: '/dashboard/recipes',
      icon: 'Book',
      items: [],
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'CreditCard',
      items: [],
    },
    {
      title: 'Purchases',
      href: '/dashboard/purchases',
      icon: 'CreditCard',
      items: [],
    },
  ],
}
