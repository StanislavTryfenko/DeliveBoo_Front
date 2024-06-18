<script>
export default {
	name: "AppHeader",
};
</script>

<template>
	<div>
		header
		<nav>
			<ul>
				<li>
					<router-link :to="{ name: 'home' }">home</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'restaurants' }">restaurants</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<style></style>
