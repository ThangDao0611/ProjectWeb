import axios from "axios";
import authHeader from "./auth-header";
import { END_POINT } from "../../config";
// const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  //   getPublicContent() {
  //     return axios.get(END_POINT + "all");
  //   }

  getUserBoard() {
    return axios.get(END_POINT + "/users/me", { headers: authHeader() });
  }

  //   getModeratorBoard() {
  //     return axios.get(END_POINT + "mod", { headers: authHeader() });
  //   }

  //   getAdminBoard() {
  //     return axios.get(END_POINT + "admin", { headers: authHeader() });
  //   }
}

export default new UserService();
