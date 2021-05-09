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
    // route level code-splitting
    // this generates a separate chunk (settings.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  },
  {
    path: '/auto',
    name: 'Automatic',
    // route level code-splitting
    // this generates a separate chunk (auto.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Auto
  },
  {
    path: '/history',
    name: 'History',
    // route level code-splitting
    // this generates a separate chunk (history.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "history" */ '../views/History.vue')
  },
  {
    path: '/manual',
    name: 'Manual',
    // route level code-splitting
    // this generates a separate chunk (manual.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "manual" */ '../views/Manual.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
