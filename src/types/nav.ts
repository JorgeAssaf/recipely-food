
export interface MainNav {
  name: string
  url: string
}

export interface SideNav extends MainNav {
  icon: string
  children?: MainNav[]
  external?: boolean
  disabled?: boolean
}
