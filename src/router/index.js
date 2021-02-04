import Vue from 'vue';
import Router from 'vue-router';
import * as CommonRouter from './routerList/commonRouter';
import * as BaseRouter from './routerList/baseRouter';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    ...CommonRouter,
    ...BaseRouter,
  ],
  scrollBehavior () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 50);
    });
  }
});
/*
  系统路由配置 meta
  【keepAlive：标记页面是否需要缓存】
  【flag：标记为详情页面调用父级路由查询页面权限（系统暂不支持配置详情页菜单）】
  【freeAuth： 标记路由页面是否为免登录（暂提供为外围系统免登录进入）】
*/
router.beforeEach((to, from, next) => {
  let tk = sessionStorage.getItem('token');
  if (to.meta.freeAuth) {
    next();
  } else {
    if (!tk && !to.meta.freeAuth) return next({path: '/login'});
    next();
  }
});

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const pattern1 = /Loading CSS chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const isChunkLoadFailed1 = error.message.match(pattern1);
  // const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed || isChunkLoadFailed1) {
    location.reload();
    // router.replace(targetPath);
  }
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;