<script>
import axios from 'axios';
import RestaurantCard from '../partials/RestaurantCard.vue';
import { state } from '../../state';

export default {
    name: "AppHome",
    components: {
        RestaurantCard
    },
    data() {
        return {
            state,
            loading: true,
            restaurants: [],
            types: [],
            typesList: [],
            searchQuery: ''
        }
    },
    mounted() {
        state.callApi();
    },
    methods: {
        callFilters() {
            const request = {
                typesList: this.typesList
            }
            if (this.typesList.length > 0) {
                axios
                    .get(state.base_api + `api/types`, { params: request })
                    .then((response) => {
                        state.restaurants = response.data.restaurants;
                        // console.log("risultati della chiamata", response.data.restaurants);
                        // console.log("ristoranti filtrati:", this.restaurants); 
                        // console.log("tipologie attive:", this.typesList);
                    })
                    .catch((error) => {
                        console.error("Errore durante la chiamata API:", error);
                    });
            } else {
                resetFilters();
            }
        },
        resetFilters() {
            //console.log(this.typesList)
            this.typesList = [];
            state.callApi();
            let inputs = document.getElementsByClassName('managing-filters');
            //console.log(inputs)
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
        },
        /* search bar */
        addType() {
            const typeName = this.searchQuery.trim().toLowerCase();
            if (typeName) {
                const type = state.types.find(t => t.name.toLowerCase() === typeName);
                if (type && !this.typesList.includes(type.id)) {
                    this.typesList.push(type.id);
                }
                this.searchQuery = '';
                this.callFilters();
            }
        }
    },
    /* computed: {
        filteredTypes() {
            const query = this.searchQuery.trim().toLowerCase();
            if (query) {
                return state.types.filter(type => type.name.toLowerCase().includes(query));
            }
            return [];
        }
    } */
}
</script>

<template>
    <!-- jumbotron with search bar -->
    <section id="my_jumbotron">
        <div class="container-fluid text-center h-100 py-5">
            <div class="row h-100 justify-content-center align-items-end">
                <div class="col-6 col-md-8 d-flex justify-content-center" id="search_card">

                    <!-- 
                        <div class="card align-items-center py-5 mb-4 rounded-5 gap-2 shadow-lg">
                            caption 
                            <h1>Tutto il gusto che ami, a casa tua</h1>
                            <p class="fs-4 lh-sm d-none d-sm-block">
                                Gusta la qualità del tuo ristorante preferito, senza lasciare il comfort di casa
                            </p>

                            search bar
                            <div class="col d-flex justify-content-between border rounded-pill p-1 shadow-sm mb-2">
                                <div class="px-2 d-flex align-items-center" id="search_bar">
                                    <i class="fa-solid fa-magnifying-glass fs-5 ps-2 text-secondary"></i>
                                    <span>
                                        <input type="text" name="types.name" id="types.name" placeholder="Cerca Categoria"
                                            class="border-0 py-3 px-2" v-model="searchQuery">
                                    </span>
                                </div>
                                <button type="submit" class="rounded-pill fw-bold border-0 px-4" @click="addType">
                                    cerca
                                </button>

                                computed results
                                <div v-if="filteredTypes.length > 0" class="position-absolute w-50 bg-white shadow-sm rounded mt-5" style="z-index: 1000;">
                                    <ul class="list-unstyled m-0 p-4">
                                        <li v-for="type in filteredTypes" :key="type.id" @click="addType(type)"
                                            class="p-2 border-bottom" style="cursor: pointer;">
                                            {{ type.name }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    -->

                </div>
            </div>
        </div>
    </section>

    <!-- vista principale -->
    <section id="show_restaurant">
        <div class="container py-4 my-2">
            <div class="row text-center">
                <h2>Scegli il ristorante</h2>

                <!-- filtri -->
                <div class="row justify-content-center" v-if="types">
                    <div class="col-12 col-md-8 d-flex justify-content-center py-2 flex-wrap">
                        <form @click="callFilters" method="get">
                            <div class="badge rounded-pill m-1" v-for="type in state.types"
                                :class="{ 'active_filter': typesList.includes(type.id) }" id="my_filters">

                                <label :for="'type-' + type.id" class="d-flex align-items-center m-1"
                                    :class="{ 'active_filter': typesList.includes(type.id) }">
                                    <input name="typesList" class="fs-6 p-1 me-2 hidden-checkbox managing-filters"
                                        type="checkbox" :value="type.id" :id="'type-' + type.id" v-model="typesList" />
                                    {{ type.name }}
                                </label>
                            </div>
                            <div class="col-12 py-2 d-flex gap-2 justify-content-center" id="filter_buttons">
                                <!-- <button type="submit" class="btn rounded border-2">Conferma filtri</button> -->
                                <button @click="resetFilters" class="btn rounded border-2"> Ripristina filtri</button>
                            </div>

                        </form>
                    </div>
                </div>

                <!-- ristoranti -->
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 w-100 py-3">
                    <div class="col" v-for="restaurant in state.restaurants.data">
                        <router-link :to="{ name: 'restaurant', params: { id: restaurant.id, slug: restaurant.slug } }"
                            class="no_style">
                            <RestaurantCard :restaurant="restaurant" :baseApiUrl="state.base_api" />
                        </router-link>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style lang="scss">
@import '../../assets/scss/variables.scss';

#my_jumbotron {
    height: 300px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("src/assets/img/jumbo-food-2.jpg");

    @media(max-width: 768px) {
        height: 450px;
    }

    @media(min-width: 1024px) {
        #search_bar {
            min-width: 400px;
        }
    }

    #search_card {
        .card {
            min-width: 350px;
        }
    }

    h1 {
        font-family: $header;
        font-weight: 800;
        color: $primary;
        width: 85%;
    }

    p {
        width: 75%;
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

#filter_buttons {
    button {
        border-color: $primary;
        color: $primary;
    }
}

.hidden-checkbox {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

//mentre un checkbox è attivo, applica questa classe:
.active_filter {
    background-color: $primary;
    color: white;
}
</style>
