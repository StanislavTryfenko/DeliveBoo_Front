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
		}
	}
};
</script>

<template>
	<div class="offcanvas offcanvas-end" tabindex="-1" id="my_offcanvas" aria-labelledby="offcanvasExampleLabel"
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
			<!-- <button class="btn border rounded text-danger" @click="clearCart">Svuota</button> -->


			<!-- Modal trigger button -->
			<button type="button" class="btn border rounded text-danger" data-bs-toggle="modal"
				data-bs-target="#clearCartModal">
				Svuota
			</button>

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

			<!-- Optional: Place to the bottom of scripts -->
			<!-- <script>
				const myModal = new bootstrap.Modal(
					document.getElementById("clearCartModal"),
					options,
				);
			</script> -->

		</div>
	</div>
</template>

<style scoped>
#my_offcanvas {
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

	width: 600px;

	@media(max-width: 425px) {
		width: 400px;
		padding: 1rem;
	}

}
</style>
