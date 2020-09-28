import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    template: 'public/index.html'
  },
  {
    path: '/about',
    name: 'About',
    component() { return import('@/views/About.vue') },
    template: 'public/index.html'
  },
  {
    path: '/projects',
    name: 'Projects',
    component() { return import('@/views/Projects.vue') },
    template: 'public/index.html'
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component() { return import('@/views/Playlists.vue') },
    template: 'public/index.html'
  },
  {
    path: '/404',
    name: 'Not Found',
    component: NotFound,
    template: 'public/index.html'
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
