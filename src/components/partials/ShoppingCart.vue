<script>
import axios from 'axios';
import { state } from '../../state';

export default {
	name: "ShoppingCart",
	data() {
		return {
			state,
		};
	},
	computed: {
		cart() {
			return state.items;
		}
	},
	methods: {
		clearCart() {
			state.items = [];
		},
		removeFromCart(itemId) {
			state.items = state.items.filter(item => item.id !== itemId);
			this.saveToLocalStorage();
		},
		increaseQuantity(item) {
			item.quantity++;
			this.saveToLocalStorage();
		},
		decreaseQuantity(item) {
			if (item.quantity > 1) {
				item.quantity--;
				this.saveToLocalStorage();
			} else {
				this.removeFromCart(item.id);
			}
		},
		saveToLocalStorage() {
			localStorage.setItem("items", JSON.stringify(state.items));
			console.log("carrello attuale: ", state.items);
		},
		toggleModal() {
			state.toggle_cart = !state.toggle_cart;
			console.log("stato modale: ", state.toggle_cart);
		}
	}
};
</script>

<template>

	<div id="my_offcanvas">
		<div class="row justify-content-between w-100 flex-nowrap p-3">
			<h4>Il mio Carrello</h4>
			<button type="button" class="btn-close" aria-label="Close" @click="toggleModal()"></button>
		</div>

		<div v-if="cart.length > 0">
			<div class="container py-4">

				<div class="row">
					<strong>Stai ordinando da: {{ state.cartRestraurantName }}</strong>

					<div class="col-12">
						<table class="table">
							<tbody>
								<tr v-for="item in cart" :key="item.id">
									<td>{{ item.name }}</td>
									<td>€ {{ item.price }}</td>
									<td class="d-flex gap-2 align-items-center pb-4">
										<div class="btn rounded border" @click="decreaseQuantity(item)">
											<i class="fa-solid fa-minus"></i>
										</div>
										{{ item.quantity }}
										<div class="btn rounded border" @click="increaseQuantity(item)">
											<i class="fa-solid fa-plus"></i>
										</div>
									</td>
									<td>
										<button class="btn btn-sm btn-danger" @click="removeFromCart(item.id)">Rimuovi</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<strong>Totale: € {{ state.calculateTotal() }}</strong>

					<div class="col-12 py-4 d-flex gap-2 justify-content-center" v-if="cart.length > 0">
						<router-link :to="{ name: 'checkout' }">
							<button class="btn border rounded checkout text-dark" @click="toggleModal()">
								Completa l'ordine
							</button>
						</router-link>
						<button class="btn border rounded text-danger" @click="clearCart">Svuota</button>
					</div>

				</div>
			</div>

		</div>
		<p v-else>Il carrello è vuoto.</p>
	</div>

	<!-- <div class="offcanvas offcanvas-end" tabindex="-1" id="my_offcanvas" aria-labelledby="offcanvasExampleLabel"
		data-bs-backdrop="static">
		<div class="offcanvas-header">
			<h4 class="offcanvas-title" id="offcanvasExampleLabel">Il mio Carrello</h4>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">


			<div v-if="cart.length > 0">

				<strong>Stai ordinando da: {{ state.cartRestraurantName }}</strong>

				<table class="table">
					<tbody>
						<tr v-for="item in cart" :key="item.id">
							<td>{{ item.name }}</td>
							<td>€ {{ item.price }}</td>
							<td class="d-flex gap-2 align-items-center pb-4">
								<div class="btn rounded border" @click="decreaseQuantity(item)">
									<i class="fa-solid fa-minus"></i>
								</div>
								{{ item.quantity }}
								<div class="btn rounded border" @click="increaseQuantity(item)">
									<i class="fa-solid fa-plus"></i>
								</div>
							</td>
							<td>
								<button class="btn btn-sm btn-danger" @click="removeFromCart(item.id)">Rimuovi</button>
							</td>
						</tr>
					</tbody>
				</table>

				<strong>Totale: € {{ state.calculateTotal() }}</strong>

			</div>
			<p v-else>Il carrello è vuoto.</p>


		</div>
		<div class="offcanvas-footer py-4 d-flex gap-2 justify-content-center" v-if="cart.length > 0">
			<router-link :to="{ name: 'checkout' }">
				<button class="btn border rounded checkout text-dark">
					Completa l'ordine
				</button>
			</router-link>
			<button class="btn border rounded text-danger" @click="clearCart">Svuota</button>
		</div>
	</div> -->
</template>

<style scoped>
#my_offcanvas {
	position: fixed;
	top: 0;
	right: 0;
	height: 100%;
	background-color: white;
	box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
	transition: right 0.3s ease;
	z-index: 1050;
	width: 40%;
	min-width: 425px;


	i {
		color: black;
		font-size: 1rem;
	}

	td {
		vertical-align: middle;
	}
}
</style>
