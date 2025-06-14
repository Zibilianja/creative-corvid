import { createApp } from 'vue';
import App from './App.vue';
import FontAwesomeIcon from './fonts.ts';
import '@/style.scss';

const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
