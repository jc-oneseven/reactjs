import { API_URI } from "../Constant/Constant";
import { GetUserFromStore } from "./Storage";

export const GetUser = () => {
  const { token, username } = GetUserFromStore();
  return fetch(`${API_URI}/users/by-email?email_id=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetOwners = async () => {
  const { token } = GetUserFromStore();
  const request = await fetch(`${API_URI}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await request.json();
  return response;
  // const allUsers = response.then((data) => data);
  // return allUsers.filter((user) => user.roles.name === "Owner");
};
