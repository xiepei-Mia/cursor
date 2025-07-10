// 用户相关类型
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  permissions: string[];
  token: string | null;
}

// 标签页相关类型
export interface TabItem {
  key: string;
  title: string;
  path: string;
  closable: boolean;
}

export interface TabsState {
  activeKey: string;
  tabs: TabItem[];
  maxTabs: number;
}

// 菜单相关类型
export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
}

export interface MenuState {
  topMenus: MenuItem[];
  currentTopMenu: string;
  currentSubMenu: string;
  searchKeyword: string;
  filteredMenus: MenuItem[];
}

// 组织相关类型
export interface Organization {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  contactPhone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
  createTime: string;
}

export interface SubAccountOrgState {
  orgList: Organization[];
  loading: boolean;
  error: string | null;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  selectedOrg: Organization | null;
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// 路由配置类型
export interface RouteConfig {
  path: string;
  name: string;
  models: string[];
  component: string;
  exact?: boolean;
}

export interface ModuleRouter {
  path: string;
  name: string;
  icon: string;
  components: RouteConfig[];
} 