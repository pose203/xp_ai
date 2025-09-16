import { createApp } from 'vue'
import router from './router';
import { createPinia } from 'pinia';

import './style.css'
import App from './App.vue'

const pinia = createPinia()

//VUE 全家桶到齐
createApp(App)
.use(router)// spa
.use(pinia)
.mount('#app')
