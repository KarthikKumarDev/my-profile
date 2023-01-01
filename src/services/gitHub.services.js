import axios from "axios";

export const getUserRepos = () => {
  return axios
    .get("https://api.github.com/users/KarthikKumarDev/repos?per_page=100")
};

export const getUserEvents = () => {
  return axios
    .get("https://api.github.com/users/KarthikKumarDev/events?per_page=100")
};