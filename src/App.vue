<script>
import AppHeader from "./components/partials/AppHeader.vue";
import AppFooter from "./components/partials/AppFooter.vue";
import ShoppingCart from "./components/partials/ShoppingCart.vue";
import { state } from "./state";

export default {
	name: 'App',
	components: {
		AppHeader,
		AppFooter,
		ShoppingCart
	},
	data() {
		return {
			state
		}
	}
};
</script>

<template>
	<ShoppingCart v-show="state.toggle_cart == true" />

	<AppHeader />
	<main>
		<RouterView />
	</main>
	<!-- <AppFooter /> -->
</template>

<style>
main {
	margin-top: 3.5rem
}
</style>
