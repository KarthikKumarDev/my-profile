import axios from "axios";

export const getUserRepos = () => {
  return axios
    .get("https://api.github.com/users/KarthikKumarDev/repos?per_page=100")
};
