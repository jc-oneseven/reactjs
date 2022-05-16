export const GetUserFromStore = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const SetUserInStore = (data) => {
  localStorage.setItem("user", data);
};

export const SetActiveUserInStore = (data) => {
  localStorage.setItem("active-user", data);
};

export const GetActiveUserInStore = (data) => {
  return JSON.parse(localStorage.getItem("active-user"));
};

export const ClearStore = () => {
  localStorage.clear();
};
