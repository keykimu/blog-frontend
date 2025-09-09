import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import './assets/styles/global.scss';

router.beforeEach((to, from, next) => {
  // ページタイトルを更新
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  // description を更新
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta && to.meta.description) {
    descriptionMeta.setAttribute('content', to.meta.description as string);
  }

  next();
});

createApp(App)
  .use(router)
  .component('Header', Header)
  .component('Footer', Footer)
  .mount('#app');
