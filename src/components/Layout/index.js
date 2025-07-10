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
  
  return (
    <AntLayout style={{ height: '100vh' }}>
      {/* 顶部导航 */}
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
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
            onClick={({ key }) => handleTopMenuClick(key)}
            style={{ border: 'none', background: 'transparent' }}
          >
            {topMenus.map(menu => {
              const IconComponent = iconMap[menu.icon];
              return (
                <Menu.Item key={menu.key} icon={IconComponent && <IconComponent />}>
                  {menu.label}
                </Menu.Item>
              );
            })}
          </Menu>
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
      
      <AntLayout>
        {/* 左侧菜单 */}
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{ background: '#fff' }}
        >
          <Menu
            mode="inline"
            selectedKeys={[currentSubMenu]}
            onClick={handleSubMenuClick}
            style={{ height: '100%', borderRight: 0 }}
          >
            {subMenus.map(subMenu => (
              <Menu.SubMenu key={subMenu.key} title={subMenu.label}>
                {subMenu.children?.map(item => (
                  <Menu.Item key={item.key} onClick={() => navigate(item.path)}>
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu>
        </Sider>
        
        {/* 主内容区域 */}
        <AntLayout style={{ padding: '0 0 0 0' }}>
          {/* 标签页 */}
          <TabBar />
          
          {/* 页面内容 */}
          <Content style={{ 
            margin: '0 16px 16px 16px', 
            padding: '16px', 
            background: '#fff',
            borderRadius: '6px',
            minHeight: 'calc(100vh - 200px)',
          }}>
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout; 