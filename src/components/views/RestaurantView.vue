<script>
export default {
    name: "RestaurantsView",
};
</script>

<template>
    <h2>restaurants</h2>
    <div class="restaurant_info">restaurant infos</div>
    <div class="menu">
        <div class="row d-flex">
            <div class="col" v-for="n in 8">
                <div class="card">
                    <div class="card-title">dish</div>
                    <div class="actions">
                        <button>+</button>
                        <button>-</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
