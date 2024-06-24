<script>
import router from "../../router";

export default {
    name: "CheckoutSuccess",
    /* se si vuole fare un redirect automatico dopo 5 secondi
    created() {
        setTimeout(() => this.$router.push({ name: 'home' }), 5000);
    } */
}
</script>

<template>
    <div class="container py-5">
        <div class="d-flex justify-content-center flex-column">
            <br>
            <h1>Grazie per i tuoi acquisti</h1>
            <br>

            <router-link :to="{ name: 'home' }">
                <button class="btn btn-primary">Torna alla Pagina Iniziale</button>
            </router-link>
        </div>
    </div>
</template>