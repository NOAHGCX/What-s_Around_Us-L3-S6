import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount("#app");
