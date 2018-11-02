import axios from 'axios';
import {Toast} from 'mint-ui';

axios.defaults.withCredentials = true;
// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(config => {// 处理请求之前的配置
  return config;
}, error => {// 请求失败的处理
  return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(res => {// 处理响应数据
  if (res.data.state != undefined && res.data.state.code == 10400) {
    Toast({
      message: res.data.state.msg,
      iconClass: 'm-icon mintui-field-error',
    });

    //Message.error(res.data.state.msg);
    return Promise.reject(error);
  }
  else if (res.data.state != undefined && res.data.state.code == 10401) {
    return res.data;
  }
  else if (res.data.state.code == 10200) {
    return res.data.data;
  } else {
    return Promise.reject(error);
  }
}, error => {// 处理响应失败
  return Promise.reject(error);
});

export default {
  send_verification: '/xp_h/index/send_verification',//发送验证码接口
  login: '/xp_h/index/login',//登录接口
  reset_password: '/xp_h/index/reset_password',//重置密码
  register: '/xp_h/index/register',//注册
  logout: '/xp_h/index/logout',//退出接口
  points_log: '/xp_h/home/points_log',//积分记录
  exchange_log: '/xp_h/home/exchange_log',//兑换记录
  goods_list: '/xp_h/index/goods_list',//商品列表
  goods_detail: '/xp_h/index/goods_detail',//商品详情
  userinfo: '/xp_h/index/userinfo',//获取用户信息
  my_account: '/xp_h/home/my_account',//帐号管理
  verify_order: '/xp_h/index/verify_order',//获取确认兑换页信息
  submit_order: '/xp_h/index/submit_order',//提交订单
  get_order_code: '/xp_h/index/get_order_code',//获取订单验证码
  exchange_detail: '/xp_h/home/exchange_detail',//兑换详情
  home_data: '/xp_h/index/index',//获取首页数据
  user_prize_log: '/xp_h/activity/user_prize_log',//兑奖记录
  verify_claim: '/xp_h/activity/verify_claim',//确认兑奖页信息
  claim_prize: '/xp_h/activity/claim_prize',//兑换奖品
  user_prize_detail: '/xp_h/activity/user_prize_detail',//奖品详情
  prize_list: '/xp_h/index/prize_list',//奖品列表
  lucky_draw: '/xp_h/activity/lucky_draw',//幸运抽奖
  promo_list:'/xp_h/index/promo_list',//资讯列表
  promo_detail:'/xp_h/index/promo_detail',//资讯详情
  app_market_list:'/xp_h/index/app_market_list',//slot,live列表
  app_market_detail:'/xp_h/index/app_market_detail',//slot,live详情
  edit_user:'/xp_h/home/edit_user',//保存用户信息



  request(data) {
    let reqData = data.data || {};
    let params = data.params || {};
    /*reqData=reqData+'&debug=1';
    params.debug=1;*/
    let requestData = {
      url: data.url,
      data: reqData,
      method: data.method || 'GET',
      params: params,
      timeout: 300000,
      withCredentials: true,
      onUploadProgress: data.onUploadProgress || null,
      headers: data.headers || '',
      responseType: data.responseType || 'json'
    };
    return axios(requestData);
  },
  // 获取用户信息
  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.request({
        url: this.userinfo,
        data: {}
      }).then((res) => {
        if (res.state) {
          Toast({
            message: res.state.msg,
            iconClass: 'm-icon mintui-field-error',
          });
          sessionStorage.clear();
          reject();
          location.href = "/login";
        } else {
          sessionStorage.setItem('userInfo', JSON.stringify(res));
          resolve(res);
        }

      });
    });

  },

  //判断是否是Android
  isAndroid() {
    return new Promise((resolve, reject) => {
      var u = navigator.userAgent;
      if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        resolve(true);
      } else {
        reject;
      }
    });
  },
  //计时器
  interval: '',
  //抽奖计算高度
  setH() {
    var CH = document.body.clientHeight;
    var CW = document.body.clientWidth;
    document.getElementById('spin').style.height = CH + 'px';
    var mH = CW * 1206 / 750;
    if (CH < mH) {
      document.getElementById('spin').style.minHeight = parseFloat(mH + 20) + 'px';
    }
  }
}
