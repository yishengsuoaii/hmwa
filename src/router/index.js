import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Tabbar from '@/views/tabbar'
import Home from '@/components/tabbar/home'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('@/views/search')
    },
    {
      name: 'search-result',
      path: '/search/:q',
      component: () => import('@/views/search/searchresult')

    },
    {
      name: 'article',
      path: '/article/:articleId',
      component: () => import('@/views/article')
    },
    {
      name: 'user',
      path: '/user',
      component: () => import('@/views/user')
    },
    { // 有默认二级子路由不需要有name属性
      // name: 'tabbar',
      path: '/tabbar',
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '',
          component: Home
        },
        {
          name: 'my',
          path: '/tabbar/my',
          component: () => import('@/views/my')
        }
      ]
    }
  ]
})
