import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from '@/components/Login'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: './login'// 如果用户访问的 / 根路径,则重定向到/login页面

    },
    { path: './login', component: Login } // 登录页面的路由规则
  ]
})
