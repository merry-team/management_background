import axios from "axios";
import { AxiosResponse } from "axios";

const merryAgent = axios.create({
  baseURL: "https://staging.bestluci.com"
});

merryAgent.interceptors.response.use(
  (req: AxiosResponse) => {
    if (req.headers["t-jwt"]) {
      const token = req.headers["t-jwt"];
      merryAgent.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("MERRY_ADMIN_TOKEN", token);
    }
    return req;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

export default merryAgent;
