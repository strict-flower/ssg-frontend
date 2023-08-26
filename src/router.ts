import { createRouter, createWebHashHistory } from 'vue-router'
import Index from './components/Index.vue'

const routes = [
    {
        path: '/:path(.*)*', name: 'Index', component: Index
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;