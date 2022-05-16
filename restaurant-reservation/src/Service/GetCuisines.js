import { API_URI } from "../Constant/Constant";

export const GetCuisines = () => {
  return fetch(`${API_URI}/restaurants/cuisines`);
};
