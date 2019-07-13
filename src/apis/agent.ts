import axios from "axios";
import { AxiosResponse } from "axios";

const staginUrl = "https://staging.bestluci.com";
const productionUrl = "https://www.bestluci.com";
const test = "http://localhost:3000";

const merryAgent = axios.create({
  baseURL: test
});

merryAgent.interceptors.response.use(
  (req: AxiosResponse) => {
    if (req.headers["t-jwt"]) {
      const token = req.headers["t-jwt"];
      merryAgent.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("MERRY_TOKEN", token);
    }
    return req;
  },
  error => {
    return Promise.reject(error.response);
  }
);

export default merryAgent;
