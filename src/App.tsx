import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

import Layout from './components/Layout/index.jsx';
import Login from './pages/Login/index.jsx';
import NotFound from './pages/NotFound/index.jsx';
import { isPublicRoute, isNoMenuRoute } from './routers/index.jsx';
import { addTab } from './models/tabs.jsx';
import { RootState } from './store';

// 动态导入页面组件
const SubAccountOrg = React.lazy(() => import('./pages/SubAccount/Org/index.jsx'));
const SubAccountUser = React.lazy(() => import('./pages/SubAccount/User/index.jsx'));
const SupplierBasic = React.lazy(() => import('./pages/Supplier/Basic/index.jsx'));
const SupplierContact = React.lazy(() => import('./pages/Supplier/Contact/index.jsx'));

// 页面组件映射
const pageComponents: Record<string, React.ComponentType> = {
  'SubAccount/Org': SubAccountOrg,
  'SubAccount/User': SubAccountUser,
  'Supplier/Basic': SupplierBasic,
  'Supplier/Contact': SupplierContact,
};

// 路由守卫组件
interface PrivateRouteProps {
  children: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  
  if (!isLoggedIn && !isPublicRoute(path)) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// 页面组件包装器
interface PageWrapperProps {
  component: React.ComponentType;
  path: string;
  name: string;
  models?: string[];
}

const PageWrapper: React.FC<PageWrapperProps> = ({ component: Component, path, name, models = [] }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // 添加标签页
    if (path && name) {
      dispatch(addTab({
        key: path,
        title: name,
        path,
        closable: true,
      }));
    }
  }, [dispatch, path, name]);
  
  return <Component />;
};

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const { theme: themeMode, primaryColor, borderRadius, compact } = useSelector((state: RootState) => state.theme);
  const { locale } = useSelector((state: RootState) => state.locale);
  const currentPath = window.location.pathname;
  const [isInitialized, setIsInitialized] = useState(false);
  
  // 等待状态初始化完成
  useEffect(() => {
    // 延迟一点时间确保Redux Persist已经恢复状态
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 如果还没有初始化完成，显示加载状态
  if (!isInitialized) {
    return (
      <ConfigProvider locale={locale === 'zh_CN' ? zhCN : enUS}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '16px',
          color: '#666'
        }}>
          正在加载...
        </div>
      </ConfigProvider>
    );
  }
  
  // 判断是否显示布局
  const shouldShowLayout = isLoggedIn && !isPublicRoute(currentPath) && !isNoMenuRoute(currentPath);
  
  // 主题配置
  const themeConfig = {
    algorithm: themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: primaryColor,
      borderRadius: borderRadius,
      ...(compact && {
        padding: 8,
        margin: 8,
        fontSize: 12,
      }),
    },
  };
  
  return (
    <ConfigProvider 
      locale={locale === 'zh_CN' ? zhCN : enUS}
      theme={themeConfig}
    >
      <Router>
        <div className="App">
          {shouldShowLayout ? (
            <Layout>
              <React.Suspense fallback={<div>加载中...</div>}>
                <Routes>
                  <Route path="/sprm/sub-account/org" element={
                    <PrivateRoute path="/sprm/sub-account/org">
                      <PageWrapper 
                        component={SubAccountOrg} 
                        path="/sprm/sub-account/org" 
                        name="组织管理"
                        models={['subAccountOrg']}
                      />
                    </PrivateRoute>
                  } />
                  <Route path="/sprm/sub-account/user" element={
                    <PrivateRoute path="/sprm/sub-account/user">
                      <PageWrapper 
                        component={SubAccountUser} 
                        path="/sprm/sub-account/user" 
                        name="用户管理"
                        models={['subAccountOrg']}
                      />
                    </PrivateRoute>
                  } />
                  <Route path="/sprm/supplier/basic" element={
                    <PrivateRoute path="/sprm/supplier/basic">
                      <PageWrapper 
                        component={SupplierBasic} 
                        path="/sprm/supplier/basic" 
                        name="基本信息"
                      />
                    </PrivateRoute>
                  } />
                  <Route path="/sprm/supplier/contact" element={
                    <PrivateRoute path="/sprm/supplier/contact">
                      <PageWrapper 
                        component={SupplierContact} 
                        path="/sprm/supplier/contact" 
                        name="联系方式"
                      />
                    </PrivateRoute>
                  } />
                  <Route path="/" element={<Navigate to="/sprm/sub-account/org" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Suspense>
            </Layout>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App; 