import Vue from 'vue'
import App from './App.vue'
import router from "@/router/index"

import Vant from 'vant';
import 'vant/lib/index.css';
import "@/assets/base.css";

import 'amfe-flexible'
import * as sccbaJsApi from '@sccbafe/sccba-js-api'
sccbaJsApi.config({
  success() {
    Vue.prototype.$sccbaJsApi = sccbaJsApi
    sccbaJsApi.utils.isInApp()
  }
})
// mock数据
if (process.env.VUE_APP_MOCK === "true") {
  require('./mock');
}


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
