<script>
export default {
	name: "AppHeader",
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
					<span class="fs-5 fw-bold">DeliveBoo</span>
				</div>
				<div class="col d-flex gap-3 justify-content-end">
					<router-link v-for="link in menu" :to="{ name: link.route }" id="header_links">
						<i :class="link.icon"></i>
					</router-link>
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
</style>
