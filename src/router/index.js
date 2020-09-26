import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
