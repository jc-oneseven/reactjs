import { API_URI } from "../Constant/Constant";
import { GetUserFromStore } from "./Storage";

export const EditRestaurant = (id, restaurant) => {
  const { token } = GetUserFromStore();
  return fetch(`${API_URI}/restaurants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(restaurant),
  }).catch((err) => alert("Something went wrong, please try again"));
};
