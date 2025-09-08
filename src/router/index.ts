import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Skill from '../views/Skill.vue';
import Work from '../views/Works.vue';
import Contact from '../views/Contact.vue';

const routes = [
  { path: '/',name: 'Home',component: Home,},
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/skill', name: 'Skill', component: Skill },
  { path: '/works', name: 'Work', component: Work },
  { path: '/contact', name: 'Contact', component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
