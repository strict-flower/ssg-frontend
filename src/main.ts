import { createApp } from 'vue'
import router from './router.ts'
import SsgHeader from './components/SsgHeader.vue'
import './style.css'
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const app = createApp({});

app.use(router);
app.component("ssg-header", SsgHeader);
app.mount('#app');
