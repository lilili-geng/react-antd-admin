import { ComponentType, LazyExoticComponent, ReactNode } from "react"
import { IRouterConfig } from "."

export interface MenuInfo {
  id: number
  name: string // 菜单名称
  code: string
  parentId: number // 父级菜单id
  sortOrder: number // 排序
  route: string // 前端路由
  children: MenuInfo[] // 子菜单
  icon?: string
  selected?: boolean
  expand?: boolean
}

export interface DropdownMenu {
  label: string
  value: string
  // TODO 待扩展权限字段
}


export interface Props {
  isDrawer: boolean;
  activeDashboard: boolean;
  isSidebarWarpOpen: boolean;
  activeRoutePath: string;
  isSidebarOpen: boolean;
  menuItems: MenuInfo[];
  isDarkMode: boolean;
  toggleSidebarWarp: () => void;
  toggleTheme: () => void;
  toRouter: (param: any) => any;
}

export interface BaseLayoutProps {
  children: ReactNode;
}


export interface StoredMenuItem {
  path: string;
  layout: ComponentType<any> | null;
  element: LazyExoticComponent<ComponentType<any>>;
  title: string;
  children: IRouterConfig[];
}

