import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home/Home.vue';
import NotFound from '@/pages/NotFound/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component() { return import('@/pages/About/About.vue') }
  },
  {
    path: '/projects',
    name: 'Projects',
    component() { return import('@/pages/Projects/Projects.vue') }
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component() { return import('@/pages/Playlists/Playlists.vue') }
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
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
