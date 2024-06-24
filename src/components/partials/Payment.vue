<template>
	<div class="d-flex align-items-center flex-column p-3">
		<div v-if="error" class="text-danger fs-3 mb-3">{{ error }}</div>
		<h1 class="mb-4">Braintree Drop-in</h1>
		<form @submit.prevent="onSubmit">
			<input type="text" v-model="form.customerName" placeholder="First Name" required />
			<input type="text" v-model="form.customerLastName" placeholder="Last Name" required />
			<input type="email" v-model="form.customerEmail" placeholder="Email" required />
			<input type="tel" v-model="form.customerPhoneNumber" placeholder="Phone Number" required />
			<input type="text" v-model="form.customerAddress" placeholder="Address" required />
			<div id="dropin-container"></div>
			<button type="submit" @click="submitPayment" class="btn btn-primary">Pay</button>
		</form>
		<!-- <div id="dropin-container" class="w-50 mb-4"></div>
        <button @click="submitPayment" class="btn btn-primary">Submit Payment</button> -->
	</div>
</template>

<script>
import dropin from 'braintree-web-drop-in';
import axios from 'axios';
import { state } from '../../state';

export default {
	data() {
		return {
			instance: null,
			form: {
				token: '',
				order: [], //array di oggetti da inviare per il controllo, devono contenere chiave id e chiave quantity
				restaurantId: null, //id del ristorante singolo, bisogna controllare che il valore inserito sia un numero e solo uno 
				customerName: '',
				customerLastName: '',
				customerPhoneNumber: '',
				customerAddress: '',
				customerEmail: '',
				//il total price verrà calcolato lato back per sicurezza
				//status ha un valore di default
			},
			error: '',
		}
	},
	props: [
		'authorization'
	],
	mounted() {
		this.createDropIn()
	},
	methods: {
		createDropIn() {
			dropin.create({
				authorization: this.authorization,
				container: '#dropin-container',
				locale: 'it_IT',
			}, (error, instance) => {
				if (error) {
					this.error = error.message;
					console.error(error)
					return
				}
				this.instance = instance
			})
		},
		submitPayment() {
			if (this.instance) {
				this.instance.requestPaymentMethod((error, payload) => {
					if (error) {
						if (error.message === 'No payment method is available.') {
							this.error = 'Seleziona un metodo di Pagamento'
						} else {
							this.error = error.response.data.message;
						}
						console.error(error);
						return;
					}
					this.form.token = payload.nonce;

					this.form.order = state.items.map(item => ({
						id: item.id,
						restaurantId: item.restaurant_id,
						quantity: item.quantity
					}));
					/* otteniamo restaurant_id dagli items */
					const uniqueRestaurantId = state.items.length > 0 ? state.items[0].restaurant_id : null;
					this.form.restaurantId = uniqueRestaurantId;
					console.log('Payment Method Nonce + this.form:', payload.nonce, this.form);

					/* axios post */
					axios.post('http://127.0.0.1:8000/api/orders/make/payment', this.form)
						.then((response) => {
							this.clearCart();
							console.log(response);
						})
						.catch((error) => {
							if (error.message === 'Request failed with status code 422') {
								this.error = 'Hai sbagliato a compilare il form per l\'invio';
							} else {
								console.log(error.response.data.message)
								this.error = error.response.data.message;
							}
							console.log(error)
						});
				});
			}
		},
		clearCart() {
			state.items = [];
			localStorage.removeItem('items');
			console.log('carrello svuotato');
		}
	},
	beforeDestroy() {
		if (this.instance) {
			this.instance.teardown(() => {
				console.log('Braintree instance torn down')
			})
		}
	}
}
</script>

<style></style>
