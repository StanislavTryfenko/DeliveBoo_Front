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
		<h2>
			header
		</h2>
		<nav>
			<div class="logo">LOGO</div>
			<ul>
				<li :class="route.route_name" v-for="route in routes">
					<router-link :to="{ name: route.route_name }">{{ route.view_name
						}}</router-link>
				</li>
				<li class="back-office">
					<a href="http://127.0.0.1:8000/">your restaurant / back-office</a>
					<!-- funziona se la porta è corretta (momentaneo) -->
				</li>
			</ul>
		</nav>
	</div>
	<hr>
</template>

<style scoped>
a {
	color: palegreen;
}
</style>
