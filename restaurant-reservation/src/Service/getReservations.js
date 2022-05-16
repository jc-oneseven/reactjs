import { API_URI } from "../Constant/Constant";
import { GetUserFromStore } from "./Storage";

export const getReservations = () => {
  const { token, username } = GetUserFromStore();
  return fetch(`${API_URI}/reservations/users?name=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getReservationsByOwner = () => {
  const { token, username } = GetUserFromStore();
  return fetch(`${API_URI}/reservations/owners?name=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
