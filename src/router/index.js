import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from '@/components/Login'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginPage', // 命名路由
      component: Login // 指定要显示的组件
    }
  ]
})
