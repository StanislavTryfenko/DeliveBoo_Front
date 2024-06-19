<script>

export default {
	name: 'RestaurantCard',
	data() {
		return {

		}
	},
	props: {
		restaurant: {
			type: Object,
			required: true
		},
		baseApiUrl: {
			type: String,
			required: true
		}
	},
	mounted() {
		/* console.log('progetto:', this.project); */
	}
}
</script>

<template>

	<router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }" class="no_style">
		<div class="card card_style rounded-1 mb-4">
			<img v-if="restaurant.cover_image" :src="baseApiUrl + '/storage/' + restaurant.cover_image"
				:alt="restaurant.name_restaurant" class="card-img-top">
			<img v-else src="https://placehold.co/200x100" :alt="restaurant.name_restaurant" class="card-img-top">
			<div class="card-body">
				<h4 class="card-title">{{ restaurant.name_restaurant }}</h4>
				<p class="line_clamp">{{ restaurant.description }}</p>
			</div>
		</div>

	</router-link>

</template>


<style lang="scss">
.no_style {
	text-decoration: none;
	color: inherit;
}
</style>