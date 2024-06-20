import axios from "axios";
import { reactive } from "vue";

export const state = reactive({
	restaurants: [],
	types: [],
	dishes: [],
	typesList: [],
	base_api: "http://127.0.0.1:8000/",
	restaurants_api: "api/restaurants",

	callApi() {
		axios
			.get(this.base_api + this.restaurants_api)
			.then(response => {
				if (response.data.success) {
					console.log(response.data);
					this.restaurants = response.data.restaurants;
					this.types = response.data.types;
					this.dishes = response.data.dishes;
					console.log("ristoranti caricati da state:", this.restaurants);
					console.log("tipologie caricate da state:", this.types);
					this.loading = false;

				} else {
					console.log("api not found");
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
});