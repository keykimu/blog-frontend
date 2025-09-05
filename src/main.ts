import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import './assets/styles/global.scss';

createApp(App)
  .use(router)
  .component('Header', Header)
  .component('Footer', Footer)
  .mount('#app');
