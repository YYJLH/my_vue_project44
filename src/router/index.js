import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from '@/components/Login'
// 导入后台首页组件
import Home from '@/components/Home'
// 导入后台Welcome组件
import Welcome from '@/components/Welcome'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login' // 如果用户访问的 / 根路径,则重定向到/login页面
    },
    { path: '/login', component: Login }, // 登录页面的路由规则
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        }
      ]
    } // 后台主页的路由规则
  ]
})
// 路由导航守卫 router.beforeEach((to,from,next) =>{})
router.beforeEach((to, from, next) => {
  // 如果访问的是登录页直接放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = sessionStorage.getItem('token')
  // console.log(tokenStr)
  // 如果token存在直接放行
  if (tokenStr) return next()
  // 如果不存在强制跳转到登录页面
  return next('/login')
})
export default router
