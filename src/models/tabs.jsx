import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeKey: '',
  tabs: [],
  maxTabs: 10, // 最大标签页数量
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action) => {
      const { key, title, path, closable = true } = action.payload;
      
      // 检查标签页是否已存在
      const existingTab = state.tabs.find(tab => tab.key === key);
      if (!existingTab) {
        // 如果标签页数量超过限制，移除第一个可关闭的标签页
        if (state.tabs.length >= state.maxTabs) {
          const firstClosableIndex = state.tabs.findIndex(tab => tab.closable);
          if (firstClosableIndex !== -1) {
            state.tabs.splice(firstClosableIndex, 1);
          }
        }
        
        state.tabs.push({ key, title, path, closable });
      }
      
      state.activeKey = key;
    },
    
    removeTab: (state, action) => {
      const targetKey = action.payload;
      const targetIndex = state.tabs.findIndex(tab => tab.key === targetKey);
      
      if (targetIndex !== -1) {
        state.tabs.splice(targetIndex, 1);
        
        // 如果关闭的是当前激活的标签页，激活下一个标签页
        if (state.activeKey === targetKey) {
          if (state.tabs.length > 0) {
            const nextIndex = targetIndex === state.tabs.length ? targetIndex - 1 : targetIndex;
            state.activeKey = state.tabs[nextIndex].key;
          } else {
            state.activeKey = '';
          }
        }
      }
    },
    
    setActiveTab: (state, action) => {
      state.activeKey = action.payload;
    },
    
    removeOtherTabs: (state, action) => {
      const targetKey = action.payload;
      state.tabs = state.tabs.filter(tab => tab.key === targetKey);
      state.activeKey = targetKey;
    },
    
    removeAllTabs: (state) => {
      state.tabs = [];
      state.activeKey = '';
    },
    
    removeRightTabs: (state, action) => {
      const targetKey = action.payload;
      const targetIndex = state.tabs.findIndex(tab => tab.key === targetKey);
      
      if (targetIndex !== -1) {
        state.tabs = state.tabs.slice(0, targetIndex + 1);
        state.activeKey = targetKey;
      }
    },
  },
});

export const {
  addTab,
  removeTab,
  setActiveTab,
  removeOtherTabs,
  removeAllTabs,
  removeRightTabs,
} = tabsSlice.actions;

export default tabsSlice.reducer; 