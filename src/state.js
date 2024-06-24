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
		})
		.catch(err => {
			console.log(err);
		});
};

/* carica local storage all'avvio */
loadFromLocalStorage();