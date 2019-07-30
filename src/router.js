import Vue from 'vue'
import Router from 'vue-router'
import gradecalculator from './views/GradeCalculator'

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
      path: '/view/address',
      name: 'address',
      component: () => import('./views/Address.vue')
    },
    {
      path: '/view/calendar',
      name: 'calendar',
      component: () => import('./views/Calendar.vue')
    },
    {
      path: '/view/gradecalculator',
      name: 'gradecalculator',
      component: gradecalculator
    }
  ]
})
