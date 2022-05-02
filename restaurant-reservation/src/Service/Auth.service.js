import { API_URI } from "./../Constant/Constant";

export const signIn = (body) => {
  console.log("signIn");

  return fetch(`${API_URI}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((err) => alert(err));
};

export const signUp = () => {
  console.log("signUp");
};

export const signOut = () => {
  console.log("signOut");
};
