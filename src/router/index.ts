import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // src/Home.vue を指定

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
