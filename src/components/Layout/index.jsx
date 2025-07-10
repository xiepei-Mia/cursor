import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Input, Dropdown, Space, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined,
  UserOutlined as UserIcon,
  ShoppingCartOutlined,
  FileTextOutlined,
  GlobalOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import {
  setCurrentTopMenu,
  setCurrentSubMenu,
  setSearchKeyword,
} from '../../models/menu';
import { logout } from '../../models/user';
import { toggleTheme } from '../../models/theme';
import { setLocale } from '../../models/locale';
import { createT } from '../../utils/i18n';
import TabBar from '../TabBar';
import ThemeSettings from '../ThemeSettings';
import LanguageSettings from '../LanguageSettings';

const { Header, Sider, Content } = AntLayout;

// 图标映射
const iconMap = {
  UserOutlined: UserIcon,
  ShoppingCartOutlined,
  FileTextOutlined,
};

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpenKeys, setMenuOpenKeys] = useState([]);
  const [themeSettingsVisible, setThemeSettingsVisible] = useState(false);
  const [languageSettingsVisible, setLanguageSettingsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    topMenus,
    currentTopMenu,
    currentSubMenu,
    searchKeyword,
    filteredMenus,
  } = useSelector(state => state.menu);
  
  const { userInfo } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);
  const { locale } = useSelector(state => state.locale);
  
  const t = createT(locale);
  
  // 获取当前顶级菜单的子菜单
  const currentTopMenuData = topMenus.find(menu => menu.key === currentTopMenu);
  const subMenus = currentTopMenuData?.children || [];
  
  // 根据当前路径找到对应的菜单项
  const findCurrentMenuKeys = () => {
    const currentPath = location.pathname;
    let selectedKeys = [currentSubMenu];
    let openKeys = [...menuOpenKeys];
    
    // 遍历菜单结构找到当前路径对应的菜单项
    for (const topMenu of topMenus) {
      for (const subMenu of topMenu.children || []) {
        for (const item of subMenu.children || []) {
          if (item.path === currentPath) {
            selectedKeys = [item.key]; // 选中三级菜单项
            // 确保对应的二级菜单展开
            if (!openKeys.includes(subMenu.key)) {
              openKeys.push(subMenu.key);
            }
            break;
          }
        }
        if (selectedKeys.length > 1) break;
      }
      if (selectedKeys.length > 1) break;
    }
    
    return { selectedKeys, openKeys };
  };
  
  const { selectedKeys, openKeys } = findCurrentMenuKeys();
  
  // 处理菜单展开/收起
  const handleMenuOpenChange = (keys) => {
    setMenuOpenKeys(keys);
  };
  
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
    } else if (key === 'theme') {
      setThemeSettingsVisible(true);
    } else if (key === 'language') {
      setLanguageSettingsVisible(true);
    }
  };
  
  // 处理主题切换
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  
  // 处理语言切换
  const handleLanguageToggle = () => {
    const newLocale = locale === 'zh_CN' ? 'en_US' : 'zh_CN';
    dispatch(setLocale(newLocale));
  };
  
  // 用户菜单项
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('user.profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('user.settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'theme',
      icon: <BulbOutlined />,
      label: t('user.theme'),
    },
    {
      key: 'language',
      icon: <GlobalOutlined />,
      label: t('user.language'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('user.logout'),
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
      label: t(`menu.${menu.key}`) !== `menu.${menu.key}` ? t(`menu.${menu.key}`) : menu.label,
      onClick: () => handleTopMenuClick(menu.key),
    };
  });

  // 左侧菜单项
  const leftMenuItems = subMenus.map(subMenu => ({
    key: subMenu.key,
    label: t(`menu.${subMenu.key}`) !== `menu.${subMenu.key}` ? t(`menu.${subMenu.key}`) : subMenu.label,
    onClick: () => handleSubMenuClick({ key: subMenu.key }),
    children: subMenu.children?.map(item => ({
      key: item.key,
      label: t(`menu.${item.key}`) !== `menu.${item.key}` ? t(`menu.${item.key}`) : item.label,
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
          {t('app.title')}
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
              placeholder={t('menu.search')}
              prefix={<SearchOutlined />}
              value={searchKeyword}
              onChange={handleMenuSearch}
              style={{ width: 200 }}
              allowClear
            />
          </Dropdown>
        </div>
        
        {/* 主题切换按钮 */}
        <div style={{ marginLeft: '16px' }}>
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={handleThemeToggle}
            title={theme === 'light' ? t('theme.dark') : t('theme.light')}
          />
        </div>
        
        {/* 语言切换按钮 */}
        <div style={{ marginLeft: '8px' }}>
          <Button
            type="text"
            icon={<GlobalOutlined />}
            onClick={handleLanguageToggle}
            title={locale === 'zh_CN' ? 'English' : '中文'}
          />
        </div>
        
        {/* 用户信息 */}
        <div style={{ marginLeft: '16px' }}>
          <Dropdown menu={{ items: userMenuItems }} onClick={handleUserMenuClick}>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>{userInfo?.name || t('user.profile')}</span>
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
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              items={leftMenuItems}
              style={{ 
                height: '100%', 
                borderRight: 0,
                paddingTop: '8px',
              }}
              onOpenChange={handleMenuOpenChange}
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
      
      {/* 主题设置弹窗 */}
      <ThemeSettings
        visible={themeSettingsVisible}
        onCancel={() => setThemeSettingsVisible(false)}
      />
      
      {/* 语言设置弹窗 */}
      <LanguageSettings
        visible={languageSettingsVisible}
        onCancel={() => setLanguageSettingsVisible(false)}
      />
    </AntLayout>
  );
};

export default Layout; 