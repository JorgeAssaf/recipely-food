
import { type SideNav } from '@/types/nav'

export interface DashboardConfig {
  sidebarNav: SideNav[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      name: 'Account',
      url: '/dashboard/account',
      icon: 'User2',
    },
    {
      name: 'Recipes',
      url: '/dashboard/recipes',
      icon: 'Book',
    },
    {
      name: 'Billing',
      url: '/dashboard/billing',
      icon: 'CreditCard',
    },
    {
      name: 'Purchases',
      url: '/dashboard/purchases',
      icon: 'CreditCard',
    },
  ],
}
