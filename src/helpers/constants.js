export const API_URL = "http://localhost:5001/api/v1";
export const getUserDetails = () => {
  let user = localStorage.getItem("user") ?? {};
  if (Object.keys(user).length > 0) return JSON.parse(user);
  else return {};
};

export const isLoggedIn = () => {
  return JSON.parse(localStorage.getItem("isLoggedIn"));
};
