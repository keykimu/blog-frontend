import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import Skill from '../views/Skill.vue';
import Works from '../views/Works.vue';
import WorkDetail from '../views/WorkDetail.vue';
import Contact from '../views/Contact.vue';
import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'トップ - kimuのポートフォリオ', description: 'トップページです' } },
  { path: '/profile', component: Profile, meta: { title: 'プロフィール - kimu', description: 'プロフィールページです' } },
  { path: '/skill', component: Skill, meta: { title: 'スキル - kimu', description: 'スキルページです' } },
  { path: '/works', component: Works, meta: { title: '成果物一覧 - kimu', description: '成果物一覧ページです' } },
  { path: '/works/:id', component: WorkDetail, meta: { title: '成果物 - kimu', description: '成果物ページです' } },
  { path: '/contact', component: Contact, meta: { title: '連絡先 - kimu', description: '連絡先ページです' } },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { title: 'NotFound - kimu', description: '存在しないページです' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
