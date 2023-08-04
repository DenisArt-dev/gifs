// Composables
import { createRouter, createWebHistory } from 'vue-router';

import GifSearch from '../components/GifSearch.vue';
import GifCard from '../components/GifCard.vue';
import Author from '../components/Author.vue';

const routes = [
  {
    path: '/',
    component: GifSearch,
  },
  {
    path: '/card/:id?',
    component: GifCard,
    props: true
  },
  {
    path: '/author/:id?',
    component: Author,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
