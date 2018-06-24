import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from '@/components/Login'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login' // 如果用户访问的 / 根路径,则重定向到/login页面
    },
    { path: '/login', component: Login } // 登录页面的路由规则
  ]
})
// 路由导航守卫 router.beforeEach((to,from,next) =>{})
router.beforeEach((to, from, next) => {
  // 如果访问的是登录页直接放行
  if (to.path === '/login') return next()
  // 获取token 字符串
  const tokenStr = sessionStorage.getItem('token')
  console.log(tokenStr)
  // 如果token存在直接放行
  if (tokenStr) return next()
  // 如果不存在强制跳转到登录页面
  next('/login')
})
export default router
