export default {
  path: '/sprm',
  name: '供应商管理',
  icon: 'UserOutlined',
  components: [
    {
      path: '/sprm/sub-account/org',
      name: '组织管理',
      models: ['subAccountOrg'],
      component: 'SubAccount/Org',
      exact: true,
    },
    {
      path: '/sprm/sub-account/user',
      name: '用户管理',
      models: ['subAccountOrg'],
      component: 'SubAccount/User',
      exact: true,
    },
    {
      path: '/sprm/supplier/basic',
      name: '基本信息',
      models: [],
      component: 'Supplier/Basic',
      exact: true,
    },
    {
      path: '/sprm/supplier/contact',
      name: '联系方式',
      models: [],
      component: 'Supplier/Contact',
      exact: true,
    },
  ],
}; 