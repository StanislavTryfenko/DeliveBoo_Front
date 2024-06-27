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
	methods: {
		callFilters() {
			const request = {
				typesList: [],
				typesList: this.typesList
			}
			if (this.typesList.length > 0) {
				axios
					.get(state.base_api + `api/types`, { params: request })
					.then((response) => {
						state.restaurants = response.data.restaurants;
						console.log("ristoranti filtrati", state.restaurants);
						/* console.log("tipologie attive:", this.typesList); */
					})
					.catch((error) => {
						console.error("Errore durante la chiamata API:", error);
					});
			} else {
				this.resetFilters();
				console.log("nessun filtro selezionato!");
			}
		},
		resetFilters() {
			this.typesList = [];
			state.callApi();
		}
	},
	mounted() {
		state.callApi();
	}
} 
</script>

<template>
	<!-- jumbotron with search bar -->
	<section id="my_jumbotron">
		<!-- <div class="container-fluid text-center h-100 py-5">
			<div class="row h-100 justify-content-center align-items-end">
				<div class="col-6 col-md-8 d-flex justify-content-center" id="search_card">

				</div>
			</div>
		</div> -->
	</section>

	<!-- vista principale -->
	<section id="show_restaurant">
		<div class="container py-4 my-2">
			<div class="row text-center">
				<h2>Scegli il ristorante</h2>

				<!-- filtri -->
				<div class="row justify-content-center" v-if="types">
					<div class="col-12 col-md-8 d-flex justify-content-center py-2 flex-wrap">
						<div class="badge rounded-pill m-1" v-for="type in state.types"
							:class="{ 'active_filter': typesList.includes(type.id) }" id="my_filters">

							<label :for="'type-' + type.id" class="d-flex align-items-center m-1"
								:class="{ 'active_filter': typesList.includes(type.id) }">
								<input name="typesList" class="fs-6 p-1 me-2 hidden-checkbox managing-filters"
									type="checkbox" :value="type.id" :id="'type-' + type.id" v-model="typesList"
									@change="callFilters" />
								{{ type.name }}
							</label>
						</div>
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

//nascondi estetica checkbox, inoltre mentre è attivo, applica questa classe:
.hidden-checkbox {
	position: absolute;
	opacity: 0;
	width: 0;
	height: 0;
}

.active_filter {
	background-color: $primary;
	color: white;
}
</style>
