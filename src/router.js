import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./views/Main.vue')
    },
    {
      path: '/view/Address',
      name: 'address',
      component: () => import('./views/Address.vue')
    },
    {
      path: '/view/Calendar',
      name: 'calendar',
      component: () => import('./views/Calendar.vue')
    }
  ]
})
