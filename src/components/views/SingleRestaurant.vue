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
			baseApiUrl: 'http://127.0.0.1:8000/',
			showModal: false
		}
	},
	mounted() {
		this.getSingleRestaurant(this.$route.params.id);
		/* console.log(this.$route.params.id) */
	},
	methods: {
		clearAndClose() {
			state.items = [];
			this.showModal = false;
		},
		getSingleRestaurant(id) {
			axios
				.get(state.base_api + this.single_restaurant_api + `/${id}`)
				.then(response => {
					/* console.log(state.base_api + this.single_restaurant_api + `/${id}`); */
					if (response.data.success) {
						/* console.log(response.data); */
						this.restaurant = response.data.restaurant;
						this.dishes = this.restaurant.dishes;
						// console.log("ristorante selezionato:", this.restaurant);
						// console.log("dishes caricati:", this.dishes);
					} else {
						this.$router.push({ name: 'not-found' })
					}
				})
				.catch(err => {
					console.log(err);
				})
		},
		addItem(dish) {
			const restaurantId = this.restaurant.id;

			/* controlla restaurant_id dei dishes nel carrello */
			if (state.items.length > 0) {
				// Ottieni il restaurant_id del primo piatto nel carrello
				const existingRestaurantId = state.items[0].restaurant_id;
				if (existingRestaurantId !== restaurantId) {
					//apri modale con messaggio che non puoi effettuare tale operazione
					console.log("Non puoi aggiungere piatti da un ristorante diverso.");
					this.showModal = true;
					return;
				}
			}
			const index = state.items.findIndex(item => item.id === dish.id);
			/* vedi se il piatto è gia presente, quindi crea o aumenta quantity */
			if (index !== -1) {
				state.items[index].quantity++;
			} else {
				state.items.push({ ...dish, quantity: 1 });
			}
			this.saveToLocalStorage();

			state.cartRestraurantName = this.restaurant.name_restaurant;
			console.log(state.cartRestraurantName, this.restaurant.name_restaurant);
		},
		removeItem(dish) {
			const index = state.items.findIndex(item => item.id === dish.id);
			if (index !== -1 && state.items[index].quantity > 1) {
				state.items[index].quantity--;
				console.log("hai rimosso il piatto ", dish);
				this.saveToLocalStorage();
			} else {
				state.items = state.items.filter(item => item.id !== state.items[index].id);
				this.saveToLocalStorage();
				console.log("it's working");
			}
		},
		/* salva gli items in local storage */
		saveToLocalStorage() {
			localStorage.setItem("items", JSON.stringify(state.items));
			console.log("carrello attuale: ", state.items);
		},
		getItemQuantity(itemId) {
			const item = state.items.find(item => item.id === itemId);
			return item ? item.quantity : 0;
		}
	}
};
</script>

<template>
	<div class="container-fluid">

		<!-- modale errore -->

		<div class="row w-75 h-25 justify-content-center py-4 border rounded border-secondary bg-light" v-if="showModal"
			id="modalCartError">
			<div class="row d-flex justify-content-around align-items-center">
				<h4 class="text-center col-12">Puoi ordinare da un solo ristorante!</h4>
				<button class="btn btn-light text-primary col-sm-6 col-md-3" @click="this.showModal = false">Continua
					col tuo
					ordine</button>
				<button type="button" class="btn btn-light text-danger col-sm-6 col-md-3"
					@click="clearAndClose()">Svuota
					Carrello</button>
			</div>
		</div>

		<!-- vista principale -->
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
			<div class="col-12 col-md-6 g-4" v-for="dish in restaurant.dishes">
				<div class="card p-3 m-2 h-100">
					<div class="row">
						<div class="col-6 col-md-9 px-3 py-1">
							<h5>
								{{ dish.name }}
							</h5>
							<p class="mb-1">€ {{ dish.price }}</p>
							<p class="mb-1"> {{ dish.description }}</p>
							<br>
							<!-- stato del carrello -->
							<div class="d-flex gap-2">
								<button class="btn rounded border" @click="removeItem(dish)">
									<i class="fa-solid fa-minus"></i>
								</button>
								<div class="border rounded text-center p-1 px-3" style="vertical-align: middle;">
									{{ getItemQuantity(dish.id) }}
								</div>
								<button class="btn rounded border" @click="addItem(dish)">
									<i class="fa-solid fa-plus"></i>
								</button>
							</div>
						</div>


						<div class="col-6 col-md-3 align-self-center">
							<img v-if="dish.image" :src="baseApiUrl + 'storage/' + dish.image"
								:alt="restaurant.name_restaurant" class="card-img my_card_img">
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

#modalCartError {
	position: fixed;
	z-index: 10;
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%);
	width: 60%;
	height: 20%;
}

.card {
	img {
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover
	}
}
</style>
