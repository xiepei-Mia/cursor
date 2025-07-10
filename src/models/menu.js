import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topMenus: [
    {
      key: 'sprm',
      label: '供应商管理',
      icon: 'UserOutlined',
      children: [
        {
          key: 'sub-account',
          label: '子账户管理',
          children: [
            { key: 'org', label: '组织管理', path: '/sprm/sub-account/org' },
            { key: 'user', label: '用户管理', path: '/sprm/sub-account/user' },
          ],
        },
        {
          key: 'supplier',
          label: '供应商信息',
          children: [
            { key: 'basic', label: '基本信息', path: '/sprm/supplier/basic' },
            { key: 'contact', label: '联系方式', path: '/sprm/supplier/contact' },
          ],
        },
      ],
    },
    {
      key: 'order',
      label: '订单管理',
      icon: 'ShoppingCartOutlined',
      children: [
        {
          key: 'purchase',
          label: '采购订单',
          children: [
            { key: 'list', label: '订单列表', path: '/order/purchase/list' },
            { key: 'detail', label: '订单详情', path: '/order/purchase/detail' },
          ],
        },
      ],
    },
    {
      key: 'contract',
      label: '合同管理',
      icon: 'FileTextOutlined',
      children: [
        {
          key: 'agreement',
          label: '合同协议',
          children: [
            { key: 'list', label: '合同列表', path: '/contract/agreement/list' },
            { key: 'template', label: '合同模板', path: '/contract/agreement/template' },
          ],
        },
      ],
    },
  ],
  currentTopMenu: 'sprm',
  currentSubMenu: 'sub-account',
  searchKeyword: '',
  filteredMenus: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setCurrentTopMenu: (state, action) => {
      state.currentTopMenu = action.payload;
      // 重置子菜单为第一个
      const topMenu = state.topMenus.find(menu => menu.key === action.payload);
      if (topMenu && topMenu.children && topMenu.children.length > 0) {
        state.currentSubMenu = topMenu.children[0].key;
      }
    },
    
    setCurrentSubMenu: (state, action) => {
      state.currentSubMenu = action.payload;
    },
    
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
      if (action.payload) {
        // 搜索菜单项
        const searchMenus = [];
        const searchInMenus = (menus, parentPath = '') => {
          menus.forEach(menu => {
            if (menu.label.toLowerCase().includes(action.payload.toLowerCase())) {
              searchMenus.push({
                ...menu,
                parentPath,
              });
            }
            if (menu.children) {
              searchInMenus(menu.children, parentPath ? `${parentPath} > ${menu.label}` : menu.label);
            }
          });
        };
        searchInMenus(state.topMenus);
        state.filteredMenus = searchMenus;
      } else {
        state.filteredMenus = [];
      }
    },
    
    clearSearch: (state) => {
      state.searchKeyword = '';
      state.filteredMenus = [];
    },
  },
});

export const {
  setCurrentTopMenu,
  setCurrentSubMenu,
  setSearchKeyword,
  clearSearch,
} = menuSlice.actions;

export default menuSlice.reducer; 