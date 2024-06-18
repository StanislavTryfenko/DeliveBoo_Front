import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./components/views/HomeView.vue";
import RestaurantView from "./components/views/RestaurantView.vue";
import CartView from "./components/views/CartView.vue";
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
            path: '/restaurant',
            name: 'restaurant',
            component: RestaurantView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
    ]
});

export default router;