//  异步加载组件
const asynComponent = path => () => import(`@/views/${path}`);
module.exports = [
  {
    path: '/base',
    name: '基础资料',
    redirect: '/base/warehouse',
    component: asynComponent('Layout/layout'),
    children: [
      {
        path: 'warehouse',
        name: '仓储关系维护',
        component: asynComponent('BaseInfoManage/warehouse')
      }
    ]
  }
];
