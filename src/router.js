import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Debugger from './views/Debugger.vue'
import About from './views/About.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/debugger',
      name: 'debugger',
      component: Debugger
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
