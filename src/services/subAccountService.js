import request from '../utils/request';

export const subAccountService = {
  // 获取组织列表
  getOrgList: (params) => {
    return request({
      url: '/api/sprm/sub-account/org',
      method: 'GET',
      params,
    });
  },

  // 创建组织
  createOrg: (data) => {
    return request({
      url: '/api/sprm/sub-account/org',
      method: 'POST',
      data,
    });
  },

  // 更新组织
  updateOrg: (id, data) => {
    return request({
      url: `/api/sprm/sub-account/org/${id}`,
      method: 'PUT',
      data,
    });
  },

  // 删除组织
  deleteOrg: (id) => {
    return request({
      url: `/api/sprm/sub-account/org/${id}`,
      method: 'DELETE',
    });
  },

  // 获取组织详情
  getOrgDetail: (id) => {
    return request({
      url: `/api/sprm/sub-account/org/${id}`,
      method: 'GET',
    });
  },

  // 获取用户列表
  getUserList: (params) => {
    return request({
      url: '/api/sprm/sub-account/user',
      method: 'GET',
      params,
    });
  },

  // 创建用户
  createUser: (data) => {
    return request({
      url: '/api/sprm/sub-account/user',
      method: 'POST',
      data,
    });
  },

  // 更新用户
  updateUser: (id, data) => {
    return request({
      url: `/api/sprm/sub-account/user/${id}`,
      method: 'PUT',
      data,
    });
  },

  // 删除用户
  deleteUser: (id) => {
    return request({
      url: `/api/sprm/sub-account/user/${id}`,
      method: 'DELETE',
    });
  },
}; 