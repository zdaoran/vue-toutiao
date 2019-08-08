import Vue from 'vue'
import App from './App.vue'
import axios from '@/api'
import ElementUI from 'element-ui'
import router from '@/router'

import '@/style/index.less'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
