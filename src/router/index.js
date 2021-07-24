import Vue from 'vue';
import VueRouter from 'vue-router';
import Auto from '../views/Auto.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Auto
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  },
  {
    path: '/auto',
    name: 'Automatic',
    component: Auto
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue')
  },
  {
    path: '/manual',
    name: 'Manual',
    component: () => import(/* webpackChunkName: "manual" */ '../views/Manual.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes
})

export default router
