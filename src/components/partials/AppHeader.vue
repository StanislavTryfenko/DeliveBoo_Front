<script>
import ShoppingCart from './ShoppingCart.vue'
import { state } from '../../state';

export default {
	name: "AppHeader",
	components: {
		ShoppingCart
	},
	data() {
		return {
			state,
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
	}, mounted() {
		state.callApi()
	}
};
</script>

<template>
	<header id="my_header">
		<div class="container">
			<div class="row justify-content-between align-items-center py-3">
				<div class="col d-flex justify-content-start">
					<router-link :to="{ name: 'home' }" class="no_style">
						<span class="fs-5 fw-bold">DeliveBoo</span>
					</router-link>

				</div>
				<div class="col d-flex gap-4 justify-content-end align-items-center ">
					<button class="btn p-0 position-relative" type="button" data-bs-toggle="offcanvas"
						data-bs-target="#my_offcanvas" aria-controls="my_offcanvas">
						<i class="fa-solid fa-basket-shopping">
							<ShoppingCart />
						</i>
						<span
							class="text-light ms-2 position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-secondary">
							{{ state.dishesTotal() }}
						</span>
					</button>

					<a href="http://127.0.0.1:8000/dashboard" target="_blank"><i class="fa-solid fa-user"></i></a>
				</div>
			</div>

		</div>
	</header>

</template>

<style lang="scss">
@import '../../assets/scss/variables.scss';

.no_style {
	text-decoration: none;
	color: inherit;
}

#my_header {
	background-color: $primary;
	color: white;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10;

	i {
		font-size: 1.2rem;
		color: white;
	}
}

#my_cart_icon {}
</style>
