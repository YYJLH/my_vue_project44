import Vue from 'vue'
import App from './App'
import router from './router'
// 导入全局样式
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
// 导入ElementUI组件库
import ElementUI from 'element-ui'
import axios from 'axios'

Vue.config.productionTip = false
// 安装elementUI
Vue.use(ElementUI)
// 全局挂载请求的baseURL
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 挂载axios
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
