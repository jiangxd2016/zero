import { createApp } from 'vue';

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import { createPinia } from 'pinia';
import App from './App.vue';

import '@unocss/reset/tailwind.css';
import 'uno.css';
import './styles/main.css';
import router from './router';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.use(ArcoVue);
app.use(ArcoVueIcon);

app.mount('#app');
