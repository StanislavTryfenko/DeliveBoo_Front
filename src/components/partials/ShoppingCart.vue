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

			<strong v-if="state.items.length != 0">Stai ordinando da: {{ state.cartRestraurantName }}</strong>

			<table v-if="cart.length > 0" class="table">
				<tbody>
					<tr v-for="item in cart" :key="item.id">
						<td>{{ item.name }}</td>
						<td>€ {{ item.price }}</td>
						<td class="d-flex gap-2 align-items-center">
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
			<p v-else>Il carrello è vuoto.</p>

			<strong v-if="state.items.length != 0">Totale: {{ state.calculateTotal() }}</strong>
		</div>
		<div class="offcanvas-footer py-4 d-flex gap-2 justify-content-center" v-if="cart.length > 0">
			<router-link :to="{ name: 'checkout' }">
				<button class="btn border rounded ">Vai al pagamento</button>
			</router-link>
			<button class="btn border rounded text-danger" @click="clearCart">Svuota carrello</button>
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
