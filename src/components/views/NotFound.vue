<script>
export default {
    name: "NotFound",
};
</script>

<template>
    <div class="container py-5">
        <div class="d-flex justify-content-center flex-column">
            <br>
            <h1>Spiacenti, questa pagina non esite.</h1>
            <br>

            <router-link :to="{ name: 'home' }">
                <button class="btn btn-primary">Torna alla Pagina Iniziale</button>
            </router-link>
        </div>
    </div>
</template>