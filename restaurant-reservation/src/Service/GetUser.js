import { API_URI } from "../Constant/Constant";
import { GetStore } from "./Storage";

export const GetUser = () => {
  const { token, username } = GetStore();
  return fetch(`${API_URI}/users/by-email?email_id=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
