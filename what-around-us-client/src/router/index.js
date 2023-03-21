import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ConnectionView from '../views/ConnectionView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/connection',
    name: 'connection',
    component: ConnectionView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
