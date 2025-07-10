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

const { TabPane } = Tabs;

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
  
  // 自定义标签页渲染
  const renderTabPane = (tab) => {
    return (
      <TabPane
        tab={
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              const menu = handleContextMenu(e, tab);
              // 这里可以显示右键菜单
            }}
          >
            {tab.title}
          </div>
        }
        key={tab.key}
        closable={tab.closable}
      />
    );
  };
  
  return (
    <div style={{ 
      background: '#fff', 
      borderBottom: '1px solid #f0f0f0',
      padding: '0 16px',
    }}>
      <Tabs
        type="editable-card"
        activeKey={activeKey}
        onChange={handleTabChange}
        onEdit={handleTabEdit}
        hideAdd
        size="small"
        style={{ margin: 0 }}
        tabBarStyle={{ margin: 0 }}
      >
        {tabs.map(tab => renderTabPane(tab))}
      </Tabs>
    </div>
  );
};

export default TabBar; 