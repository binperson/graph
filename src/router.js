import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Demo from './views/Demo'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/MiddleBresenham'
    },
    {
      path: '/DDA',
      name: 'DDA',
      component: () => import(/* webpackChunkName: "about" */ './components/DDA/')
    },
    {
      path: '/MiddleBresenham',
      name: 'MiddleBresenham',
      component: () => import(/* webpackChunkName: "about" */ './components/MiddleBresenham/'),
      meta: {
        title: '在0≤k≤1情况下的整数的中点Bresenham算法'
      }
    },
    {
      path: '/OptimizeBresenham',
      name: 'OptimizeBresenham',
      component: () => import(/* webpackChunkName: "about" */ './components/OptimizeBresenham/'),
      meta: {
        title: '在0≤k≤1情况下的改进的Bresenham算法'
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/index',
      name: 'index',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Index.vue')
    }
  ]
})
