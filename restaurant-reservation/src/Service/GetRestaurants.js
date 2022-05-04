import { API_URI } from "../Constant/Constant";

export const GetRestaurants = (searchText = "") => {
  return fetch(`${API_URI}/restaurants?searchText=${searchText}`);
};

export const GetRestaurant = (id) => {
  return fetch(`${API_URI}/restaurants/${id}`);
};
