// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Api from './js/api.js';
import Element from 'element-ui'
import qs from 'qs';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'

Vue.config.productionTip = false;
Vue.prototype.api = Api;
Vue.prototype.qs=qs;
Vue.use(Element);

window.bus = new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
}).$mount('#app');
