import axios from "axios";
import { reactive } from "vue";

const initialState = {
	restaurants: [],
	types: [],
	dishes: [],
	typesList: [],
	base_api: "http://127.0.0.1:8000/",
	restaurants_api: "api/restaurants",
	items: []
};


export const state = reactive(initialState);

/* carica local storage all'avvio */
const loadFromLocalStorage = () => {
	const storedItems = JSON.parse(localStorage.getItem("items"));
	state.items = storedItems ? storedItems : [];
};

/* salva item in local storage */
const saveToLocalStorage = () => {
	localStorage.setItem("items", JSON.stringify(state.items));
};

/* calcola il totale del carrello */
state.calculateTotal = function () {
	let total = 0;
	for (let item of this.items) {
		const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
		total += item.quantity * price;
	}
	return total.toFixed(2);
};

/* axios call all'api */
state.callApi = function () {
	axios
		.get(this.base_api + this.restaurants_api)
		.then(response => {
			this.restaurants = response.data.restaurants;
			this.types = response.data.types;
			this.dishes = response.data.dishes;
			this.typesList = response.data.typesList;
			saveToLocalStorage();
			this.loading = false;

			/* console.log("types caricati:", this.types); */
		})
		.catch(err => {
			console.log(err);
		});
};

/* carica local storage all'avvio */
loadFromLocalStorage();