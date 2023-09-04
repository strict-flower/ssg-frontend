import { createRouter, createWebHistory } from 'vue-router'
import Index from './components/Index.vue'
import config from '../config.json'

const DEFAULT_TITLE = config["title"] as string;

const routes = [
    {
        path: '/:path(.*)*', name: 'Index', component: Index
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((_to, _from, next) => {
    document.title = DEFAULT_TITLE;
    next()
})

export default router;