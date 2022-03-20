import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import FaceCapture from '../components/FaceCapture.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/facecapture',
    name: 'FaceCapture',
    component: FaceCapture
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
