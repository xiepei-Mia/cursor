import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Input, Dropdown, Avatar, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  SearchOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

import TabBar from '../TabBar';
import { setCurrentTopMenu, setCurrentSubMenu, setSearchKeyword } from '../../models/menu';
import { logout } from '../../models/user';

const { Header, Sider, Content } = AntLayout;

// 图标映射
const iconMap = {
  UserOutlined: UserOutlined,
  ShoppingCartOutlined: ShoppingCartOutlined,
  FileTextOutlined: FileTextOutlined,
};

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [collapsed, setCollapsed] = useState(false);
  
  const { topMenus, currentTopMenu, currentSubMenu, searchKeyword, filteredMenus } = useSelector(state => state.menu);
  const { userInfo } = useSelector(state => state.user);
  
  // 获取当前顶级菜单的子菜单
  const currentTopMenuData = topMenus.find(menu => menu.key === currentTopMenu);
  const subMenus = currentTopMenuData?.children || [];
  
  // 处理顶级菜单点击
  const handleTopMenuClick = (menuKey) => {
    dispatch(setCurrentTopMenu(menuKey));
    // 跳转到第一个子菜单
    const menu = topMenus.find(m => m.key === menuKey);
    if (menu?.children?.[0]?.children?.[0]?.path) {
      navigate(menu.children[0].children[0].path);
    }
  };
  
  // 处理子菜单点击
  const handleSubMenuClick = ({ key }) => {
    dispatch(setCurrentSubMenu(key));
    // 跳转到对应的页面
    const subMenu = subMenus.find(m => m.key === key);
    if (subMenu?.children?.[0]?.path) {
      navigate(subMenu.children[0].path);
    }
  };
  
  // 处理菜单搜索
  const handleMenuSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchKeyword(value));
  };
  
  // 处理搜索菜单项点击
  const handleSearchItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
      dispatch(setSearchKeyword(''));
    }
  };
  
  // 处理用户菜单
  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/login');
    }
  };
  
  // 用户菜单项
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];
  
  // 搜索菜单项
  const searchMenuItems = filteredMenus.map(item => ({
    key: item.key,
    label: (
      <div>
        <div>{item.label}</div>
        {item.parentPath && (
          <div style={{ fontSize: '12px', color: '#999' }}>
            {item.parentPath}
          </div>
        )}
      </div>
    ),
    onClick: () => handleSearchItemClick(item),
  }));

  // 顶部菜单项
  const topMenuItems = topMenus.map(menu => {
    const IconComponent = iconMap[menu.icon];
    return {
      key: menu.key,
      icon: IconComponent && <IconComponent />,
      label: menu.label,
      onClick: () => handleTopMenuClick(menu.key),
    };
  });

  // 左侧菜单项
  const leftMenuItems = subMenus.map(subMenu => ({
    key: subMenu.key,
    label: subMenu.label,
    onClick: () => handleSubMenuClick({ key: subMenu.key }),
    children: subMenu.children?.map(item => ({
      key: item.key,
      label: item.label,
      onClick: () => navigate(item.path),
    })),
  }));
  
  return (
    <AntLayout style={{ height: '100vh', overflow: 'hidden' }}>
      {/* 顶部导航 */}
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        height: '64px',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
          采购系统供应商门户
        </div>
        
        {/* 顶部菜单 */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginLeft: '48px' }}>
          <Menu
            mode="horizontal"
            selectedKeys={[currentTopMenu]}
            items={topMenuItems}
            style={{ border: 'none', background: 'transparent' }}
          />
        </div>
        
        {/* 搜索框 */}
        <div style={{ marginLeft: '24px', position: 'relative' }}>
          <Dropdown
            menu={{ items: searchMenuItems }}
            open={searchKeyword.length > 0}
            placement="bottomRight"
            trigger={['click']}
          >
            <Input
              placeholder="搜索菜单..."
              prefix={<SearchOutlined />}
              value={searchKeyword}
              onChange={handleMenuSearch}
              style={{ width: 200 }}
              allowClear
            />
          </Dropdown>
        </div>
        
        {/* 用户信息 */}
        <div style={{ marginLeft: '24px' }}>
          <Dropdown menu={{ items: userMenuItems }} onClick={handleUserMenuClick}>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>{userInfo?.name || '用户'}</span>
            </Space>
          </Dropdown>
        </div>
      </Header>
      
      <AntLayout style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        {/* 左侧菜单 */}
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{ 
            background: '#fff',
            borderRight: '1px solid #f0f0f0',
            overflow: 'hidden',
          }}
        >
          <div style={{ 
            height: '100%', 
            overflowY: 'auto',
            overflowX: 'hidden',
          }}>
            <Menu
              mode="inline"
              selectedKeys={[currentSubMenu]}
              items={leftMenuItems}
              style={{ 
                height: '100%', 
                borderRight: 0,
                paddingTop: '8px',
              }}
            />
          </div>
        </Sider>
        
        {/* 主内容区域 */}
        <AntLayout style={{ 
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* 标签页 */}
          <div style={{ flexShrink: 0 }}>
            <TabBar />
          </div>
          
          {/* 页面内容 */}
          <Content style={{ 
            flex: 1,
            margin: '16px',
            padding: '16px', 
            background: '#fff',
            borderRadius: '6px',
            overflowY: 'auto',
            overflowX: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout; 