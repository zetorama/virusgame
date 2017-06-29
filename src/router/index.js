import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Matrix from '@/components/Matrix'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'game',
      component: Matrix,
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
    },
  ]
})
