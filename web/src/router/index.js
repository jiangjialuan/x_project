import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'SEGA GAMES',
      component: (resolve) => require(['../pages/home.vue'], resolve),
    },
    {
      path: '/login',
      name: '登录',
      component: (resolve) => require(['../pages/login/login.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/index',
      component: (resolve) => require(['../pages/index.vue'], resolve),
      redirect: '/user/index',
      meta: {common: true},
      children: [
        {
          path: '/user/index',
          name: '用户列表',
          component: (resolve) => require(['../pages/user/list.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/points/record',
          name: '积分记录',
          component: (resolve) => require(['../pages/points/record.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/app/list',
          name: '帐号管理',
          component: (resolve) => require(['../pages/transitPage.vue'], resolve),
          meta: {common: true},
          children: [
            {
              path: '/account/list/:app_id',
              name: 'app帐号列表',
              component: (resolve) => require(['../pages/account/list.vue'], resolve),
              meta: {common: true}
            },
            {
              path: '/app/list',
              name: 'app列表',
              component: (resolve) => require(['../pages/app/list.vue'], resolve),
              meta: {common: true},
            },
          ]
        },
        {
          path: '/goods',
          name: '商城',
          component: (resolve) => require(['../pages/transitPage.vue'], resolve),
          meta: {common: true},
          children: [

            {
              path: '/goods/list',
              name: '商品管理',
              component: (resolve) => require(['../pages/goods/list.vue'], resolve),
              meta: {common: true},
            },
            {
              path: '/goods/create',
              name: '新增商品',
              component: (resolve) => require(['../pages/goods/goodForm.vue'], resolve),
              meta: {common: true},
            },
            {
              path: '/goods/edit/:id',
              name: '编辑商品',
              component: (resolve) => require(['../pages/goods/goodForm.vue'], resolve),
              meta: {common: true},
            },
          ]
        },
        {
          path: '/order',
          name: '订单管理',
          component: (resolve) => require(['../pages/transitPage.vue'], resolve),
          meta: {common: true},
          children: [
            {
              path: '/order/list',
              name: '订单列表',
              component: (resolve) => require(['../pages/order/list.vue'], resolve),
              meta: {common: true},
            },
            {
              path: '/order/detail/:id',
              name: '订单详情',
              component: (resolve) => require(['../pages/order/detail.vue'], resolve),
              meta: {common: true},
            },
          ]
        },
        {
          path: '/prizes',
          name: '抽奖管理',
          component: (resolve) => require(['../pages/transitPage.vue'], resolve),
          meta: {common: true},
          children: [

            {
              path: '/prizes/prizelist',
              name: '奖品列表',
              component: (resolve) => require(['../pages/prizes/prizeList.vue'], resolve),
              meta: {common: true},
            },
            {
              path: '/prizes/cashprizelist',
              name: '中奖列表',
              component: (resolve) => require(['../pages/prizes/cashPrizeList.vue'], resolve),
              meta: {common: true},
            },
            {
              path: '/prizes/cashprizedetail/:id',
              name: '中奖详情',
              component: (resolve) => require(['../pages/prizes/cashPrizeDetail.vue'], resolve),
              meta: {common: true},
            },
          ]
        },
        {
          path: '/promo/index',
          name: '资讯管理',
          component: (resolve) => require(['../pages/promo/index.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/promo/create',
          name: '新增资讯',
          component: (resolve) => require(['../pages/promo/promoForm.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/promo/edit/:id',
          name: '编辑资讯',
          component: (resolve) => require(['../pages/promo/promoForm.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/live-slot/index',
          name: '应用管理',
          component: (resolve) => require(['../pages/live-slot/list.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/live-slot/create',
          name: '新增应用',
          component: (resolve) => require(['../pages/live-slot/live-slot-form.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/live-slot/edit/:id',
          name: '编辑应用',
          component: (resolve) => require(['../pages/live-slot/live-slot-form.vue'], resolve),
          meta: {common: true}
        },
      ]
    },
    ]
});
export default router;
