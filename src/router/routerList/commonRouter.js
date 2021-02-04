//  异步加载组件
const asynComponent = path => {
  return () => import(`@/views/${path}`);
};
module.exports = [
  {
    path: '/home',
    name: '首页',
    component: asynComponent('Layout/layout'),
    children: [
      {
        path: '/home',
        component: asynComponent('Home/home')
      }
    ]
  },
  {
    path: '/login',
    name: '登录页',
    meta: {
      freeAuth: true
    },
    component: asynComponent('Login/login')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    component: asynComponent('notFound')
  }
];
