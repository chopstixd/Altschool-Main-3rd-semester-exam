import { createApp } from 'vue'
import Vue from "vue";
import App from './App.vue'
import router from './router'



const app = createApp(App);

// Define global variable
app.config.globalProperties.$username = 'Hello, World!';

app.use(router).mount('#app');

