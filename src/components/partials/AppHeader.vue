<script>
// import ShoppingCart from './ShoppingCart.vue'
import { state } from '../../state';
import axios from 'axios';

export default {
	name: "AppHeader",
	/* components: {
		ShoppingCart
	}, */
	data() {
		return {
			state,
			menu: [
				{
					route: 'home',
					icon: 'fa-solid fa-house-chimney'
				},
				{
					route: 'cart',
					icon: 'fa-solid fa-cart-shopping'
				},
			]
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
		}
	},
	computed: {
		cart() {
			return state.items;
		}
	},
	mounted() {
		state.callApi()
	}
};
</script>

<template>
	<header id="my_header">
		<div class="container">
			<div class="row justify-content-between align-items-center py-2">
				<div class="col d-flex justify-content-start">
					<router-link :to="{ name: 'home' }" class="no_style">
						<span class="fs-5 fw-bold">DeliveBoo</span>
					</router-link>

				</div>
				<div class="col d-flex gap-3 justify-content-end align-items-center">
					<!-- <router-link v-for="link in menu" :to="{ name: link.route }">
						<i :class="link.icon"></i>
					</router-link> -->

					<button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#Id2"
						aria-controls="Id2">
						<i class="fa-solid fa-cart-shopping"></i>
						<span class="text-light ms-2">
							{{ state.dishesTotal() }}
						</span>
					</button>

					<a href="http://127.0.0.1:8000/dashboard" target="_blank"><i class="fa-solid fa-user"></i></a>
				</div>
			</div>

		</div>
	</header>


	<div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="Id2"
		aria-labelledby="staticBackdropLabel">
		<div class="offcanvas-header">
			<h4 class="offcanvas-title" id="staticBackdropLabel">
				Il mio Carrello
			</h4>
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
			<!-- <button class="btn border rounded text-danger" @click="clearCart">Svuota</button> -->


			<!-- Modal trigger button -->
			<button type="button" class="btn border rounded text-danger" data-bs-toggle="modal"
				data-bs-target="#clearCartModal">
				Svuota
			</button>
		</div>

		<!-- Modal Body -->
		<!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
		<div class="modal fade" id="clearCartModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
			role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
			<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
				<div class="modal-content">
					<div class="modal-body">Vuoi davvero svuotare il carrello?</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
							Annulla
						</button>
						<button type="button" class="btn btn-primary" @click="clearCart">Svuota</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import '../../assets/scss/variables.scss';

#my_header {
	background-color: $primary;
	color: white;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;

	i {
		font-size: 1.2rem;
		color: white;
	}
}

.no_style {
	text-decoration: none;
	color: inherit;
}

#Id2 {
	width: 600px;

	.offcanvas-body {
		font-size: 16px;
		font-weight: 400;
		font-family: sans-serif;
		color: black;

		i {
			color: black;
			font-size: 1rem;
		}

		td {
			vertical-align: middle;
		}

	}

	#clearCartModal {
		z-index: 2000;
	}



	@media(max-width: 425px) {
		width: 400px;
		padding: 1rem;
	}

}
</style>
