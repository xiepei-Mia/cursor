import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import Layout from './components/Layout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { isPublicRoute, isNoMenuRoute } from './routers';
import { addTab } from './models/tabs';

// 动态导入页面组件
const SubAccountOrg = React.lazy(() => import('./pages/SubAccount/Org'));
const SubAccountUser = React.lazy(() => import('./pages/SubAccount/User'));
const SupplierBasic = React.lazy(() => import('./pages/Supplier/Basic'));
const SupplierContact = React.lazy(() => import('./pages/Supplier/Contact'));

// 页面组件映射
const pageComponents = {
  'SubAccount/Org': SubAccountOrg,
  'SubAccount/User': SubAccountUser,
  'Supplier/Basic': SupplierBasic,
  'Supplier/Contact': SupplierContact,
};

// 路由守卫组件
const PrivateRoute = ({ children, path }) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  
  if (!isLoggedIn && !isPublicRoute(path)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// 页面组件包装器
const PageWrapper = ({ component: Component, path, name, models = [] }) => {
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

function App() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const currentPath = window.location.pathname;
  
  // 判断是否显示布局
  const shouldShowLayout = isLoggedIn && !isPublicRoute(currentPath) && !isNoMenuRoute(currentPath);
  
  return (
    <ConfigProvider locale={zhCN}>
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
}

export default App; 