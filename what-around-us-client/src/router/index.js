import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ConnectionView from '../views/ConnectionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      enterClass: 'none',
      leaveClass: 'none'
    },
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      enterClass: 'none',
      leaveClass: 'animate__animated animate__slideOutUp'
    },
    component: AboutView
  },
  {
    path: '/connection',
    name: 'connection',
    meta: {
      enterClass: 'none',
      leaveClass: 'none'
    },
    component: ConnectionView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
