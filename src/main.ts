import { createApp } from 'vue'
import router from './router.ts'
import './style.css'

const app = createApp({});

app.use(router);

app.mount('#app');
