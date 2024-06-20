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
            single_restaurant_api: 'api/restaurant'
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

                    } else {
                        console.log("api not found");
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
    <h2>restaurants</h2>
    <div class="restaurant_info">restaurant infos</div>
    <div class="container py-4">
        <div class="row d-flex gap-2">
            <div class="col-12">
                <div class="card">
                    <h5>Piatti disponibili: {{ this.dishes.length }}</h5>
                </div>
            </div>
            <div class="col" v-for="dish in this.restaurant.dishes">
                <!-- siamo qui -->
                <div class="card">
                    <div class="card-title">{{ dish.name }}</div>
                    <div class="card-body">{{ dish.description }}</div>

                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
