import axios from "axios";
import { END_POINT } from "../../config";
// class AuthService {
export const login = (email, password) => {
  return axios
    .post(END_POINT + "/users/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        console.log("token", localStorage.getItem("token"));
      }
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = (name, email, password) => {
  return axios
    .post(END_POINT + "/users", {
      name: name,
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }

      console.log("token", response);
      return response.data;
    });
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
// }

// export default new AuthService();
