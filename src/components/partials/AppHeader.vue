<script>
export default {
	name: "AppHeader",
	data() {
		return {
			routes: [
				{
					route_name: 'home',
					view_name: 'Home'
				},
				{
					route_name: 'restaurants',
					view_name: 'Restaurants'
				},
				{
					route_name: 'cart',
					view_name: 'Cart'
				},
			]
		}
	}
};
</script>

<template>
	<div>
		header
		<nav>
			<div class="logo">LOGO</div>
			<ul>
				<li v-for="route in routes">
					<router-link activeClass :to="{ name: route.route_name }">{{ route.view_name }}</router-link>
				</li>
				<li>
					<a href="http://127.0.0.1:8000/">your restaurant</a>
					<!-- funziona se la porta è corretta (momentaneo) -->
				</li>
			</ul>
		</nav>
	</div>
</template>

<style></style>
