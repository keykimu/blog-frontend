import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Skill from '../views/Skill.vue';
import Works from '../views/Works.vue';
import WorkDetail from '../views/WorkDetail.vue';
import Contact from '../views/Contact.vue';
import NotFound from '../views/NotFound.vue';

import Login from '../views/admin/Login.vue';
import AdminTop from '../views/admin/Top.vue';
import AdminWorks from '../views/admin/WorkList.vue';
import AdminNewWork from '../views/admin/NewWork.vue';
import AdminNotFound from '../views/admin/AdminNotFound.vue';
import AdminWorkEdit from '../views/admin/WorkEdit.vue';
import AdminSkill from '../views/admin/Skill.vue';
import AdminProfile from '../views/admin/Profile.vue';

import PublicLayout from '../layouts/PublicLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
const routes = [
  {
    path: '/',
    component: () => PublicLayout,
    children: [
      { path: '', name: 'Home', component: () => Home },
      { path: 'profile', name: 'Profile', component: Profile },
      { path: 'skill', name: 'Skill', component: Skill },
      { path: 'works', name: 'Works', component: Works },
      { path: 'works/:id', name: 'WorkDetail', component: WorkDetail },
      { path: 'contact', name: 'Contact', component: Contact },

      { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: Login,
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'top', name: 'AdminTop', component: AdminTop },
      { path: 'works', name: 'AdminWorks', component: AdminWorks },
      { path: 'works/new', name: 'AdminNewWork', component: AdminNewWork },
      { path: 'works/:id/edit', name: 'AdminWorkEdit', component: AdminWorkEdit },
      { path: 'skill', name: 'AdminSkill', component: AdminSkill },
      { path: 'profile', name: 'AdminProfile', component: AdminProfile },

      { path: ':pathMatch(.*)*', name: 'AdminNotFound', component: AdminNotFound },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, __from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (to.path.startsWith('/admin') && to.path !== '/admin' && !isLoggedIn) {
    next('/admin');
  } else {
    next();
  }
});

export default router;
