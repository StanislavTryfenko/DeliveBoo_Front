<script>
import ShoppingCart from './ShoppingCart.vue'

export default {
	name: "AppHeader",
	components: {
		ShoppingCart
	},
	data() {
		return {
			menu: [
				{
					route: 'home',
					icon: 'fa-solid fa-house-chimney'
				},
				{
					route: 'cart',
					icon: 'fa-solid fa-cart-shopping'
				},
			]
		}
	}
};
</script>

<template>
	<header id="my_header">
		<div class="container">
			<div class="row justify-content-between align-items-center py-2">
				<div class="col d-flex justify-content-start">
					<router-link :to="{ name: 'home' }" class="no_style">
						<span class="fs-5 fw-bold">DeliveBoo</span>
					</router-link>

				</div>
				<div class="col d-flex gap-3 justify-content-end align-items-center">
					<!-- <router-link v-for="link in menu" :to="{ name: link.route }">
						<i :class="link.icon"></i>
					</router-link> -->
					<button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#my_offcanvas"
						aria-controls="my_offcanvas">
						<i class="fa-solid fa-cart-shopping">
							<ShoppingCart />
						</i>
					</button>
					<a href="http://127.0.0.1:8000/" target="_blank"><i class="fa-solid fa-user"></i></a>
				</div>
			</div>

		</div>
	</header>

</template>

<style lang="scss">
@import '../../assets/scss/variables.scss';

#my_header {
	background-color: $primary;
	color: white;

	i {
		font-size: 1.2rem;
		color: white;
	}
}

.no_style {
	text-decoration: none;
	color: inherit;
}
</style>
