<script>
import { state } from '../../state';
import axios from 'axios';

export default {
    name: "SingleRestaurant",
    data() {
        return {
            state,
            dishes: [],
            restaurant: '',
            single_restaurant_api: 'api/restaurant',
            baseApiUrl: 'http://127.0.0.1:8000/'
        }
    },
    mounted() {
        this.getSingleRestaurant(this.$route.params.id);
        /* console.log(this.$route.params.id) */
    },
    methods: {
        getSingleRestaurant(id) {
            axios
                .get(state.base_api + this.single_restaurant_api + `/${id}`)
                .then(response => {
                    console.log(state.base_api + this.single_restaurant_api + `/${id}`);
                    if (response.data.success) {
                        console.log(response.data);
                        this.restaurant = response.data.restaurant;
                        this.dishes = this.restaurant.dishes;
                        console.log("ristorante selezionato:", this.restaurant);

                    } else {
                        this.$router.push({ name: 'not-found' })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
};
</script>

<template>
    <div class="container-fluid">

        <div class="row p-3 shadow-lg">
            <div class="col-12 py-1">
                <router-link :to="{ name: 'home' }" class="no_style text-secondary px-1">
                    <i class="fa-solid fa-arrow-left"></i>
                    Torna Indietro
                </router-link>
            </div>

            <!-- restaurant dashboard -->
            <div class="col-12 col-sm-4 py-3">
                <img v-if="restaurant.thumb" :src="baseApiUrl + 'storage/' + restaurant.thumb"
                    :alt="restaurant.name_restaurant" class="card-img-top my_card_img img-thumbnail">
                <img v-else src="https://placehold.co/300x200" :alt="restaurant.name_restaurant"
                    class="card-img-top img-thumbnail">
            </div>
            <div class="col-8 py-3">
                <h2>{{ restaurant.name_restaurant }}</h2>
                <ul class="list-inline mb-5">
                    <li v-for="type in restaurant.types" class="list-inline-item">{{ type.name }};</li>
                </ul>
                <div class="d-flex align-items-center gap-2 text-secondary">
                    <i class="fa-solid fa-circle-info"></i>
                    <span class="fs-5">Informazioni</span>
                </div>
                <p class="fs-3">{{ restaurant.description }}</p>

                <p><i class="fa-solid fa-phone"></i> {{ restaurant.phone_number }}</p>
                <p><i class="fa-solid fa-location-dot"></i> {{ restaurant.address }}</p>
                <p><i class="fa-solid fa-envelope"></i> {{ restaurant.contact_email }}</p>

            </div>
        </div>

        <!-- dishes list -->
        <div class="row p-3 bg-light">
            <div class="col-12 px-5 py-2">
                <h4>MENU</h4>
            </div>
            <div class="col-12 col-md-6" v-for="dish in restaurant.dishes">
                <div class="card p-3 m-2">
                    <div class="row">
                        <div class="col-6 col-md-9 px-3 py-1">
                            <h5>
                                {{ dish.name }}
                            </h5>
                            <p class="mb-1">€ {{ dish.price }}</p>
                            <p class="mb-1"> {{ dish.description }}</p>
                            <br>
                            <button class="btn rounded border">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>

                        <div class="col-6 col-md-3 align-self-center">
                            <img v-if="dish.image" :src="baseApiUrl + 'storage/' + dish.image"
                                :alt="restaurant.name_restaurant" class="card-img my_card_img" height="200">
                            <img v-else src="https://placehold.co/100x100" :alt="restaurant.name_restaurant"
                                class="card-img">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.no_style {
    text-decoration: none;
    color: inherit;
}
</style>
