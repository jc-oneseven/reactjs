import { API_URI } from "../Constant/Constant";
import { GetUserFromStore } from "./Storage";

export const GetRestaurants = (searchText = "") => {
  return fetch(`${API_URI}/restaurants?searchText=${searchText}`);
};

export const GetRestaurant = (id) => {
  return fetch(`${API_URI}/restaurants/${id}`);
};
export const GetRestaurantsByOwner = () => {
  const { token, username } = GetUserFromStore();
  return fetch(`${API_URI}/restaurants/owner?name=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
