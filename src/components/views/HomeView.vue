<script>
export default {
    name: "HomeView",
};
</script>

<template>
    <h2>home</h2>

    <div class="jumbotron">
        <div class="filter">
            <h3>filter checkboxes</h3>
            <div v-for="n in 5">
                <label for="type">restaurant type</label>
                <input type="checkbox" name="type" id="">
            </div>
        </div>
        <div class="restaurants">
            <h3>restaurants</h3>
            <div class="row">
                <div class="col" v-for="n in 3">
                    <router-link :to="{ name: 'restaurant' }">
                        <div class="card">restaurant card</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
