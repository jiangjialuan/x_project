import axios from 'axios';
import {Message} from 'element-ui'

axios.defaults.withCredentials = true;
// 请求拦截（配置发送请求的信息）
axios.interceptors.request.use(config => {// 处理请求之前的配置
  return config;
}, error => {// 请求失败的处理
  return Promise.reject(error);
});

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(res => {// 处理响应数据
  if (res.data.state!=undefined&&res.data.state.code == 10400) {
    Message.error(res.data.state.msg);
    return Promise.reject(error);
  } else if (res.data.state!=undefined&&res.data.state.code == 10401) {
    Message.error(res.data.state.msg);
    sessionStorage.clear();
    location.replace("/login");
  }else if(res.data.state.code == 10200){
    return res.data.data;
  }else{
    return Promise.reject(error);
  }
}, error => {// 处理响应失败
  return Promise.reject(error);
});

export default {
  login: `/xp_web/index/login`,//通过密码登录
  logout:'/xp_web/index/logout',//退出接口
  user_list:'/xp_web/user/user_list',//用户列表
  change_user_points:'/xp_web/user/change_user_points',//修改积分
  user_points:'/xp_web/user/user_points',//积分记录
  app_list:'/xp_web/app/app_list',//app列表帐号管理列表
  app_info:'/xp_web/app/app_info',//获取单条app数据
  store_app:'/xp_web/app/store_app',//保存app
  del_app:'/xp_web/app/del_app',//删除app
  app_account_list:'/xp_web/app/app_account_list',//app帐号列表
  app_account_info:'/xp_web/app/app_account_info',//获取app帐号列表数据
  store_app_account:'/xp_web/app/store_app_account',//保存app帐号
  del_app_account:'/xp_web/app/del_app_account',//删除app帐号
  distribute_app_account:'/xp_web/app/distribute_app_account',//派发帐号保存
  goods_list:'/xp_web/goods/goods_list',//商品列表
  upload_img: `/index/index/upload_img`,//上传图片二进制流
  upload_data_img: `/index/index/upload_data_img`,//上传图片
  del_goods:'/xp_web/goods/del_goods',//删除商品
  change_status:'/xp_web/goods/change_status',//上下架接口
  store_goods:'/xp_web/goods/store_goods',//保存商品
  goods_detail:'/xp_web/goods/goods_detail',//获取商品详情
  order_list:'/xp_web/order/order_list',//订单列表
  finish_order:'/xp_web/order/finish_order',//兑换完成
  order_detail:'/xp_web/order/order_detail',//订单详情
  user_prize_list:'/xp_web/activity/user_prize_list',//用户兑奖列表
  user_prize_detail:'/xp_web/activity/user_prize_detail',//兑奖详情
  finish_claim_prize:'/xp_web/activity/finish_claim_prize',//兑奖完成
  store_prize:'/xp_web/activity/store_prize',//保存奖品数据
  prize_list:'/xp_web/activity/prize_list',//获取奖品列表
  promo_list:'/xp_web/promo/promo_list',//资讯列表
  del_promo:'/xp_web/promo/del_promo',//删除资讯
  promo_detail:'/xp_web/promo/promo_detail',//获取资讯详情
  store_promo:'/xp_web/promo/store_promo',//保存资讯内容
  app_market_list:'/xp_web/app_market/app_market_list',//应用列表
  del_app_market:'/xp_web/app_market/del_app_market',//删除应用
  app_market_detail:'/xp_web/app_market/app_market_detail',//获取应用详情
  store_app_market:'/xp_web/app_market/store_app_market',//保存应用数据

  request(data) {
    let reqData = data.data || {};
    let params=data.params||{};
    /*reqData=reqData+'&debug=1';
    params.debug=1;*/
    let requestData = {
      url: data.url,
      data: reqData,
      method: data.method || 'GET',
      params:params,
      timeout:300000,
     withCredentials:true,
      onUploadProgress:data.onUploadProgress||null,
      headers: data.headers || '',
      responseType:data.responseType|| 'json'
    };
    return axios(requestData);
  },
  photo_Server:'http://yimi.artqiyi.com',
}
