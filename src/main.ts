import { createApp } from 'vue';
import App from './App.vue';
import FontAwesomeIcon from './fonts';
import './style.scss';

const app = createApp(App);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
