import React from 'react';
import { Tabs, Dropdown } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  removeTab,
  setActiveTab,
  removeOtherTabs,
  removeAllTabs,
  removeRightTabs,
} from '../../models/tabs';

const TabBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { tabs, activeKey } = useSelector(state => state.tabs);
  
  // 处理标签页切换
  const handleTabChange = (key) => {
    dispatch(setActiveTab(key));
    navigate(key);
  };
  
  // 处理标签页编辑（关闭）
  const handleTabEdit = (targetKey, action) => {
    if (action === 'remove') {
      dispatch(removeTab(targetKey));
    }
  };
  
  // 处理右键菜单
  const handleContextMenu = (e, tab) => {
    e.preventDefault();
    
    const menuItems = [
      {
        key: 'refresh',
        label: '刷新页面',
        onClick: () => {
          window.location.reload();
        },
      },
      {
        key: 'close',
        label: '关闭标签页',
        onClick: () => {
          dispatch(removeTab(tab.key));
        },
      },
      {
        key: 'closeOthers',
        label: '关闭其他标签页',
        onClick: () => {
          dispatch(removeOtherTabs(tab.key));
        },
      },
      {
        key: 'closeRight',
        label: '关闭右侧标签页',
        onClick: () => {
          dispatch(removeRightTabs(tab.key));
        },
      },
      {
        type: 'divider',
      },
      {
        key: 'closeAll',
        label: '关闭所有标签页',
        onClick: () => {
          dispatch(removeAllTabs());
        },
      },
    ];
    
    return menuItems;
  };
  
  // 标签页项
  const tabItems = tabs.map(tab => ({
    key: tab.key,
    label: (
      <div
        onContextMenu={(e) => {
          e.preventDefault();
          const menu = handleContextMenu(e, tab);
          // 这里可以显示右键菜单
        }}
      >
        {tab.title}
      </div>
    ),
    closable: tab.closable,
  }));
  
  return (
    <div style={{ 
      background: '#fff', 
      borderBottom: '1px solid #f0f0f0',
      padding: '0 16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      zIndex: 10,
    }}>
      <Tabs
        type="editable-card"
        activeKey={activeKey}
        onChange={handleTabChange}
        onEdit={handleTabEdit}
        hideAdd
        size="small"
        style={{ margin: 0 }}
        tabBarStyle={{ 
          margin: 0,
          padding: '8px 0 0 0',
        }}
        items={tabItems}
      />
    </div>
  );
};

export default TabBar; 