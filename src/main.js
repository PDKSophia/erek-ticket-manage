import Vue from 'vue'
import App from './App.vue'
import router from './router/main'
import api from 'service/index'
Object.defineProperty(Vue.prototype, '$api', { value: api })
import utils from './js/utils/utils'
Object.defineProperty(Vue.prototype, '$utils', { value: utils })
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
// import iview
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

import store from './store'
require('./js/mock/app')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
