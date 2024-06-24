    <script>
    import Payment from '../partials/Payment.vue';
    import axios from 'axios';
    
    
    
    export default {
        data() {
            return {
                initialToken: ''
            }
        },
        components: {
            Payment,
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

<template>
    <template v-if="initialToken !== ''">
        <Payment :authorization="initialToken"></Payment>
    </template>
    <div v-else>loading...</div>

</template>

<script>
import Payment from '../partials/Payment.vue';
import axios from 'axios';

export default {
    data() {
        return {
            initialToken: ''
        }
    },
    components: {
        Payment,
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