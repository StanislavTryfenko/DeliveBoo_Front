import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./components/views/AppHome.vue";
import SingleRestaurant from "./components/views/SingleRestaurant.vue";
import NotFound from "./components/views/NotFound.vue";
import SingleRestaurantNotFound from "./components/views/SingleRestaurantNotFound.vue";
import Checkout from "./components/views/Checkout.vue";
import CheckoutSuccess from "./components/views/CheckoutSuccess.vue"


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
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: "/:pathMatch(.*)*",
            name: 'not-found',
            component: SingleRestaurantNotFound
        },
        {
            path: "/checkout",
            name: 'checkout',
            component: Checkout
        },
        {
            path: "/checkout_success",
            name: 'checkout_success',
            component: CheckoutSuccess
        },
    ]
});

export default router;