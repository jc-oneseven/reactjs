import { API_URI } from "../Constant/Constant";
import { GetUserFromStore } from "./Storage";

export const CreateRestaurant = (newRestaurant) => {
  const { token } = GetUserFromStore();
  return fetch(`${API_URI}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newRestaurant),
  }).catch((err) => alert("Something went wrong, please try again"));
};
