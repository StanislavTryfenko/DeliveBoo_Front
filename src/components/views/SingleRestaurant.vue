<script>
import router from '../../router';
import axios from 'axios';

export default {
    name: "SingleRestaurant",
    data() {
        return {
            restaurant: {},
            types: [],
            dishes: [],
            base_api_url: 'http://127.0.0.1:8000',
            base_restaurants_url: '/api/restaurants',
            callSuccess: null,
            loading: true
        }
    },
    methods: {
        callApiSingleRestaurant(url) {
            axios.get(url).then(response => {
                console.log(response.data)
                this.restaurant = response.data.response
                this.types = response.data.response.types
                this.dishes = response.data.response.dishes
                this.callSuccess = response.data.success
                if (this.callSuccess == false) {
                    this.$router.push({ name: 'NotFound' })
                }
            }).catch(error => {
                console.error(error);
            })
        }
    },
    mounted() {
        let single_restaurant_url = this.base_api_url + this.base_restaurants_url + '/' + this.$route.params.id
        this.callApiSingleRestaurant(single_restaurant_url)
    }
};
</script>

<template>
    <div class="restaurant_info d-flex">
        <div class="image m-3">
            <img src="https://placehold.co/400x300" alt="">
        </div>
        <div class="info m-3">
            <h2>{{ restaurant.name_restaurant }}</h2>
            <div class="metadata">
                <ul class="list-group my-3">
                    <li class="list-group-item" v-if="restaurant.address != null">
                        <strong>Indirizzo: </strong><span>{{ restaurant.address }}</span>
                    </li>
                    <li class="list-group-item" v-if="restaurant.contact_email != null">
                        <strong>E-mail di contatto: </strong><span>{{ restaurant.contact_email }}</span>
                    </li>
                    <li class="list-group-item" v-if="restaurant.phone_number != null">
                        <strong>Numero di telefono: </strong><span>{{ restaurant.phone_number }}</span>
                    </li>
                </ul>
                <ul class="types d-flex justify-content-evenly p-0">
                    <li class="badge bg-primary" v-for="type in types">{{ type.name }}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="menu">
        <div class="row d-flex">
            <div class="col" v-for="n in 8">
                <div class="card">
                    <div class="card-title">dish</div>
                    <div class="actions">
                        <button>+</button>
                        <button>-</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
