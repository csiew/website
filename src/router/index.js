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
    path: '/blog',
    name: 'Blog',
    component() { return import('@/views/Blog.vue') }
  },
  {
    path: '/post/:id',
    name: 'Post',
    component() { return import('@/views/Post.vue') },
    props: true
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
  base: process.env.BASE_URL,
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
