import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Skill from '../views/Skill.vue';
import Work from '../views/Works.vue';

const routes = [
  { path: '/',name: 'Home',component: Home,},
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/skill', name: 'Skill', component: Skill },
  { path: '/works', name: 'Work', component: Work },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
