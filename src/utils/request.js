import axios from 'axios';
import { message } from 'antd';
import store from '../store';
import { logout } from '../models/user';

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// BigInt转字符串的递归函数
const convertBigIntToString = (obj) => {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'bigint') {
    return obj.toString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  }
  
  if (typeof obj === 'object') {
    const converted = {};
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertBigIntToString(value);
    }
    return converted;
  }
  
  return obj;
};

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加token到请求头
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 转换BigInt为字符串
    response.data = convertBigIntToString(response.data);
    
    // 处理业务错误
    if (response.data && response.data.code && response.data.code !== 200) {
      const errorMsg = response.data.message || '请求失败';
      message.error(errorMsg);
      return Promise.reject(new Error(errorMsg));
    }
    
    return response;
  },
  (error) => {
    let errorMsg = '网络错误';
    
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          errorMsg = '未授权，请重新登录';
          store.dispatch(logout());
          // 跳转到登录页
          window.location.href = '/login';
          break;
        case 403:
          errorMsg = '拒绝访问';
          break;
        case 404:
          errorMsg = '请求的资源不存在';
          break;
        case 500:
          errorMsg = '服务器内部错误';
          break;
        default:
          errorMsg = data?.message || `请求失败 (${status})`;
      }
    } else if (error.request) {
      errorMsg = '网络连接失败，请检查网络设置';
    } else {
      errorMsg = error.message || '请求配置错误';
    }
    
    // 显示错误消息
    message.error(errorMsg);
    
    return Promise.reject(error);
  }
);

// 请求方法封装
const request = (config) => {
  return instance(config);
};

// 便捷方法
request.get = (url, params, config = {}) => {
  return instance.get(url, { params, ...config });
};

request.post = (url, data, config = {}) => {
  return instance.post(url, data, config);
};

request.put = (url, data, config = {}) => {
  return instance.put(url, data, config);
};

request.delete = (url, config = {}) => {
  return instance.delete(url, config);
};

export default request; 