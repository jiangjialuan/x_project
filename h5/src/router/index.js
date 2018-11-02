import Vue from 'vue'
import Router from 'vue-router'
import Api from "../js/api.js";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:'SEGA GAMING',
      component: (resolve) => require(['../pages/main/home.vue'], resolve),
    },
    {
      path: '/main',
      name: 'gits',
      component: (resolve) => require(['../pages/main/index.vue'], resolve),
      meta: {common: true},
      redirect: '/main/index',
      children: [
        {
          path: '/main/index',
          name: 'gifts',
          component: (resolve) => require(['../pages/main/gifts/gifts.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/main/promo',
          name: 'promo',
          component: (resolve) => require(['../pages/main/promo/promo.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/main/live',
          name: 'live',
          component: (resolve) => require(['../pages/main/live/live.vue'], resolve),
          meta: {common: true}
        },
        {
          path: '/main/slot',
          name: 'slot',
          component: (resolve) => require(['../pages/main/slot/slot.vue'], resolve),
          meta: {common: true}
        },
      ]
    },
    {
      path: '/login',
      name: 'PLEASE LOGIN',
      component: (resolve) => require(['../pages/login/login.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/register',
      name: 'REGISTER A NEW ACCOUNT',
      component: (resolve) => require(['../pages/login/register.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/change_password',
      name: 'CHANGE PASSWORD',
      component: (resolve) => require(['../pages/login/changepassword.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/goods',
      redirect: '/',
    },
    {
      path: '/lottery',
      name: 'BONUS WHEELS',
      component: (resolve) => require(['../pages/lottery/index.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/exchange',
      name: 'Exchange prize',
      component: (resolve) => require(['../pages/goods/exchange.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/account',
      name: 'MY ACCOUNT',
      component: (resolve) => require(['../pages/account/account.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/account/manager',
      name: 'CASINO ACCOUNTS',
      component: (resolve) => require(['../pages/account/manager.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/record/points',
      name: 'CREDITS HISTORY',
      component: (resolve) => require(['../pages/record/points.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/record/exchange',
      name: 'EXCHANGE HISTORY',
      component: (resolve) => require(['../pages/record/exchange.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/goods/detail/:id',
      name: 'GIFT DETAILS',
      component: (resolve) => require(['../pages/goods/detail.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/exchange/comfirm/:id',
      name: 'CONFIRM INFORMATION',
      component: (resolve) => require(['../pages/exchange/comfirm.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/exchange/success/:id',
      name: 'SUCCEEDED',
      component: (resolve) => require(['../pages/exchange/success.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/exchange/detail/:id',
      name: 'EXCHANGE DETAILS',
      component: (resolve) => require(['../pages/exchange/detail.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/lottery/hository',
      name: 'PRIZE HISTORY',
      component: (resolve) => require(['../pages/lottery/prizehository.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/lottery/comfirm/:id',
      name: 'CONFIRM PRIZE INFORMATION',
      component: (resolve) => require(['../pages/lottery/comfirm.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/lottery/detail/:id',
      name: 'PRIZE DETAILS',
      component: (resolve) => require(['../pages/lottery/detail.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/customer',
      name: '24/7 SERVICE',
      component: (resolve) => require(['../pages/customerus/customerus.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/aboutus',
      name: 'ABOUT US',
      component: (resolve) => require(['../pages/aboutus/aboutus.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/promo/detail/:id',
      name: 'PROMO DETAILS',
      component: (resolve) => require(['../pages/main/promo/detail.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/live/detail/:id',
      name: 'LIVE DETAILS',
      component: (resolve) => require(['../pages/main/live/detail.vue'], resolve),
      meta: {common: true}
    },
    {
      path: '/slot/detail/:id',
      name: 'SLOT DETAILS',
      component: (resolve) => require(['../pages/main/slot/detail.vue'], resolve),
      meta: {common: true}
    },

  ]
})
router.beforeEach((to, from, next) => {
  var flag=true;
  if(to.name=='promo'||to.name=='gifts'||to.name=='live'||to.name=='slot'||to.name=='SEGA GAMING'){
    flag=false;
  }
  if(from.name=='BONUS WHEELS'){
    flag=true;
  }
  if(flag){
    clearInterval(Api.interval);
  }
  window.scrollTo(0, 0);
  //document.title = to.name;
  next();
});
export default router;
