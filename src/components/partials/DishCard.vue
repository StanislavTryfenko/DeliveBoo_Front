<script>
export default {
    name: 'DishCard',
    props: {
        dish: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div class="card h-100">
        <img v-if="dish.image" :src="base_api_url + '/storage/' + dish.image" :alt="dish.name" class="card-img-top">
        <img v-else src="https://placehold.co/100x100" :alt="dish.name" class="card-img-top">
        <div class="card-body">
            <h4 class="card-title">{{ dish.name }}</h4>
            <p class="card-text">{{ dish.description }}</p>
            <strong>Prezzo: € </strong>
            <span>{{ dish.price }}</span>
            <br>
            <strong>Disponibilità: </strong>
            <template v-if="dish.visible === 1">
                <span>✅</span>
            </template>
            <template v-else>
                <span>❌</span>
            </template>
            <br>
        </div>
        <div class="actions text-center">
            <button>Aggiungi</button>
            <button>Togli</button>
        </div>
    </div>
</template>

<style scoped></style>