import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Notifications from '@kyvg/vue3-notification'
import Dropdown from 'v-dropdown'
import './utils/style';

window.$ = require('jquery');

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Notifications);
app.use(Dropdown);
app.mount('#app');
