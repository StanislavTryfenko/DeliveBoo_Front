import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./components/views/HomeView.vue";
import RestaurantsView from "./components/views/RestaurantsView.vue";
import NotFound from "./components/views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/restaurants',
            name: 'restaurants',
            component: RestaurantsView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
    ]
});

export default router;