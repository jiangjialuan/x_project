// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import responsive from './js/responsive';
import './css/style.css';
import Api from "./js/api.js";
import qs from 'qs';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

Vue.config.productionTip = false;
Vue.prototype.api = Api;
Vue.prototype.qs=qs;

/* eslint-disable no-new */
window.bus = new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
}).$mount('#app');

