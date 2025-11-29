import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import './assets/styles/global.scss';
import { createPinia } from 'pinia';
import { setupRouterGuards } from './stores/setupRouterGurds';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.component('Header', Header);
app.component('Footer', Footer);
setupRouterGuards(router);

app.mount('#app');
