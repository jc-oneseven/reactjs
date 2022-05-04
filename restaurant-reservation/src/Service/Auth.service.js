import { API_URI } from "./../Constant/Constant";
import { ClearStore, GetUserFromStore } from "./Storage";

export const signIn = (body) => {
  return fetch(`${API_URI}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((err) => alert(err));
};

export const signUp = (body) => {
  const { token } = GetUserFromStore();
  return fetch(`http://localhost:8080/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
};

export const SignOut = () => {
  ClearStore();
};
