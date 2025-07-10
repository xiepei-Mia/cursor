import sprmRouter from './sprm';

// 所有路由配置
export const routers = {
  sprm: sprmRouter,
  // 可以添加更多模块路由
  // order: orderRouter,
  // contract: contractRouter,
};

// 免登录页面路由
export const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/404',
  '/500',
];

// 无菜单页面路由
export const noMenuRoutes = [
  '/404',
  '/500',
  '/blank',
];

// 获取所有路由配置
export const getAllRoutes = () => {
  const allRoutes = [];
  
  Object.values(routers).forEach(router => {
    if (router.components) {
      router.components.forEach(component => {
        allRoutes.push({
          ...component,
          module: router.path,
        });
      });
    }
  });
  
  return allRoutes;
};

// 根据路径获取路由配置
export const getRouteByPath = (path) => {
  const allRoutes = getAllRoutes();
  return allRoutes.find(route => route.path === path);
};

// 检查是否为免登录页面
export const isPublicRoute = (path) => {
  return publicRoutes.some(route => path.startsWith(route));
};

// 检查是否为无菜单页面
export const isNoMenuRoute = (path) => {
  return noMenuRoutes.some(route => path.startsWith(route));
}; 