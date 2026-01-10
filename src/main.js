import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/index.css';

// Create and mount the Vue app
const app = createApp(App);
app.use(router);
app.mount('#app');