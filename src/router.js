import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./components/views/AppHome.vue";
import AppRestaurants from "./components/views/AppRestaurants.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/restaurants',
            name: 'restaurants',
            component: AppRestaurants
        },
    ]
});

export default router;