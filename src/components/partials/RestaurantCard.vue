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
	<div class="card card_style rounded-1 mb-4">
		<img v-if="restaurant.thumb" :src="baseApiUrl + '/uploads/' + restaurant.thumb" :alt="restaurant.name_restaurant"
			class="card-img-top my_card_img">
		<img v-else src="https://placehold.co/200x100" :alt="restaurant.name_restaurant" class="card-img-top">
		<div class="card-body">
			<h4 class="card-title">{{ restaurant.name_restaurant }}</h4>
			<p class="line_clamp">{{ restaurant.description }}</p>
		</div>
	</div>

</template>


<style lang="scss">
.no_style {
	text-decoration: none;
	color: inherit;
}

.my_card_img {

	img {
		width: 100%;
		height: auto;
	}
}
</style>