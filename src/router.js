import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./components/views/AppHome.vue";
import SingleRestaurant from "./components/views/SingleRestaurant.vue";
import Cart from "./components/views/Cart.vue";
import NotFound from "./components/views/NotFound.vue";
import Checkout from "./components/views/Checkout.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/restaurant/:id/:slug',
            name: 'restaurant',
            component: SingleRestaurant,
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        }
    ]
});

export default router;