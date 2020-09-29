import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component() { return import('@/views/About.vue') }
  },
  {
    path: '/projects',
    name: 'Projects',
    component() { return import('@/views/Projects.vue') }
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component() { return import('@/views/Playlists.vue') }
  },
  {
    path: '/404',
    name: 'Not Found',
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not Found',
    redirect: '/404'
  }
];

const router = createRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production'
  ? '/vue-crash-course/'
  : '/',
  history: createWebHistory(process.env.NODE_ENV === 'production'
  ? '/vue-crash-course/'
  : '/',),
  routes
});

export default router;
