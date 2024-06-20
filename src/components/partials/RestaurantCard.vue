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
		//console.log(this.restaurant);
		//console.log(this.baseApiUrl);
	}
}
</script>

<template>
	<div class="card card_style rounded-1 mb-4">
		<img v-if="restaurant.thumb" :src="baseApiUrl + 'storage/' + restaurant.thumb" :alt="restaurant.name_restaurant"
			class="card-img-top">
		<img v-else src="https://placehold.co/200x100" :alt="restaurant.name_restaurant" class="card-img-top">
		<div class="card-body">
			<h4 class="card-title">{{ restaurant.name_restaurant }}</h4>

			<div class="card-text">
				{{ restaurant.address }}
			</div>

			<div class="card-text">
				<span v-for="type in restaurant['types']" class="badge bg-primary rounded-pill">
					{{ type.name }}
				</span>
			</div>

		</div>
	</div>

</template>


<style lang="scss">
.no_style {
	text-decoration: none;
	color: inherit;
}
</style>