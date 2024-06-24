<template>
    <template v-if="initialToken !== ''">
        <Payment :authorization="initialToken"></Payment>
    </template>
    <div v-else>loading...</div>

    <!-- <PaymentForm /> -->
</template>

<script>
import Payment from '../partials/Payment.vue';
import axios from 'axios';

import PaymentForm from '../partials/PaymentForm.vue'

export default {
    data() {
        return {
            initialToken: ''
        }
    },
    components: {
        Payment,
        PaymentForm
    },
    methods: {
        getInitialToken() {
            axios.get('http://127.0.0.1:8000/api/orders/generate').then((response) => {
                // console.log(response.data.token);
                this.initialToken = response.data.token
                /* if (this.initialToken !== '') {
                    console.log('yes');
                } */
            })
        }
    },
    mounted() {
        this.getInitialToken()
    }
}
</script>

<style></style>