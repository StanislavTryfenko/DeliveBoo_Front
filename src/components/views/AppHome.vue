<script>
import axios from 'axios';
import RestaurantCard from '../partials/RestaurantCard.vue';

export default {
    name: "AppHome",
    components: {
        RestaurantCard
    },
    data() {
        return {
            loading: true,
            restaurants: [],
            types: [],
            typesList: [],
            base_api_url: 'http://127.0.0.1:8000',
            base_restaurants_url: '/api/restaurants',
        }
    },
    mounted() {
        let url = this.base_api_url + this.base_restaurants_url
        this.callApi(url);
    },
    methods: {
        callApi(url) {
            axios
                .get(url)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data);
                        this.restaurants = response.data.restaurants;
                        this.types = response.data.types;
                        console.log("ristoranti caricati:", this.restaurants);
                        console.log("tipologie caricate", this.types);
                        this.loading = false;
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
    <!-- jumbotron with search bar -->
    <section id="my_jumbotron">
        <div class="container-fluid text-center h-100 py-5">
            <div class="row h-100 justify-content-center align-items-end">
                <div class="col-6 px-4">
                    <div class="card align-items-center py-5 mb-4 rounded-5 gap-2 shadow-lg">
                        <h1>Tutto il gusto che ami, a casa tua</h1>
                        <p class="w-50 fs-4 lh-sm">
                            Gusta la qualità del tuo ristorante preferito, senza lasciare il comfort di casa
                        </p>
                        <div class="d-flex justify-content-between border rounded-pill p-1 col shadow-sm mb-2">
                            <div class="px-2 d-flex align-items-center">
                                <i class="fa-solid fa-magnifying-glass fs-5 ps-2 text-secondary"></i>
                                <span>
                                    <input type="text" name="restaurant_name" id="restaurant_name"
                                        placeholder="nome del ristorante" class="border-0 py-3 px-2">
                                </span>
                            </div>
                            <button type="submit" class="rounded-pill fw-bold border-0 px-5">cerca</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- vista principale -->
    <section id="show_restaurant">
        <div class="container py-5 my-2">
            <div class="row text-center">
                <h2>Scegli il ristorante</h2>
                <!-- filtri -->
                <div class="row justify-content-center" v-if="types">
                    <div class="col-8 d-flex justify-content-center gap-2 py-2">
                        <div class="badge rounded-pill" v-for="type in types" id="my_filters">
                            <!-- <input name="typesList" class="fs-6 p-1" type="checkbox" :value="type.id"
                                :id="'type-' + type.id" v-model="typesList">
                            </input>
                            <label class="form-check-label" :for="'type-' + type.id">{{ type.name, type.id }}</label> -->

                            <label :for="'type-' + type.id" class="d-flex align-items-center">
                                <input name="typesList" class="fs-6 p-1 me-2 hidden-checkbox" type="checkbox"
                                    :value="type.id" :id="'type-' + type.id" v-model="typesList" />
                                {{ type.name }}
                            </label>


                            <!-- <input name="technologiesList" class="form-check-input" type="checkbox" :value="tech.id"
                                :id="'tech-' + tech.id" v-model="technologiesList" />
                            <label class="form-check-label" :for="'tech-' + tech.id">{{ tech.name, tech.id }}</label> -->

                        </div>
                    </div>
                </div>

                <!-- ristoranti -->
                <div class="row w-100 py-3" v-if="restaurants">
                    <div class="col-4" v-for="restaurant in restaurants.data">
                        <RestaurantCard :restaurant="restaurant" :baseApiUrl="base_api_url" />
                    </div>
                </div>
            </div>

        </div>
    </section>


</template>

<style lang="scss">
@import '../../assets/scss/variables.scss';

#my_jumbotron {
    height: 700px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("src/assets/img/jumbo-food-2.jpg");

    h1 {
        font-family: $header;
        font-weight: 800;
        color: $primary;
    }

    button {
        color: white;

        background-color: $primary;
    }
}

#show_restaurant {
    h2 {
        font-family: $header;
        font-weight: 700;
        color: $primary;
    }
}

#my_filters {
    border: 1px solid $primary;
    color: $primary;
}

/* .hidden-checkbox {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
} */
</style>
