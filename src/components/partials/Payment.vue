<template>
    <div class="d-flex align-items-center flex-column p-3">
        <div v-if="error" class="text-danger fs-3 mb-3">{{ error }}</div>
        <h1 class="mb-4">Braintree Drop-in</h1>
        <div id="dropin-container" class="w-50 mb-4"></div>
        <button @click="submitPayment" class="btn btn-primary">Submit Payment</button>
    </div>
</template>

<script>
import dropin from 'braintree-web-drop-in';
import axios from 'axios';

export default {
    data() {
        return {
            instance: null,
            form: {
                token: '',
                order: [], //array di oggetti da inviare per il controllo, devono contenere chiave id e chiave quantity
                restaurantId: 1, //id del ristorante singolo, bisogna controllare che il valore inserito sia un numero e solo uno 
                customerName: 'Carlo',
                customerLastName: 'De Vincenzi',
                customerPhoneNumber: '3482968954',
                customerAddress: 'Via Carlo , 123',
                customerEmail: 'carlodev@gmail.com',
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
                authorization: this.authorization,  // Sostituisci con la tua autorizzazione client
                container: '#dropin-container',
                locale: 'it_IT'
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
                    this.form.order = [
                        { id: 1, quantity: 2 },
                        { id: 2, quantity: 5 },
                        { id: 10, quantity: 1 }
                    ]; //qui sto costruendu un array di prova, ma ovviamente deve essere sostituito ogni volta
                    console.log('Payment Method Nonce:', payload.nonce, this.form);
                    axios.post('http://127.0.0.1:8000/api/orders/make/payment', this.form)
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            if (error.message === 'Request failed with status code 422') {
                                this.error = 'Hai sbagliato a compilare il form per l\'invio';
                            } else {
                                console.log(error.response.data.message)
                                this.error = error.response.data.message;
                                
                            }

                        });
                });
            }
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
