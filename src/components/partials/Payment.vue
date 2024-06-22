<template>
    <div>
        <h1>Braintree Drop-in</h1>
        <div id="dropin-container"></div>
        <button @click="submitPayment">Submit Payment</button>
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
                order: ''
            }
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
                container: '#dropin-container'
            }, (error, instance) => {
                if (error) {
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
                        console.error(error);
                        return;
                    }
                    console.log('Payment Method Nonce:', payload.nonce, this.form);
                    axios.post('http://127.0.0.1:8000/api/orders/make/payment', { token: payload.nonce, order: 10 }).then((response) => {
                        console.log(response);
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