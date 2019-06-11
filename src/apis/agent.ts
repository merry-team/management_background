import axios from "axios";
import { AxiosResponse } from "axios";

const merryAgent = axios.create({
  baseURL: "https://staging.bestluci.com"
});

merryAgent.interceptors.response.use(
  (req: AxiosResponse) => {
    return req;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

export default merryAgent;
