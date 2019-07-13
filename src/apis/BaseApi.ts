import { AxiosInstance, AxiosRequestConfig } from "axios";
import merryAgent from "./agent";
import notice from "../components/Notice";

export enum HttpMethods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch"
}

interface BaseConfig {
  url: string;
  params?: Object;
}

interface PostConfig extends BaseConfig {
  data: Object;
}

interface DeleteConfig extends BaseConfig {
  data?: Object;
}

export default class BaseApi {
  constructor(protected agent: AxiosInstance = merryAgent) {
    const token = localStorage.getItem("MERRY_TOKEN");
    if (token) {
      agent.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  async get<T>(config: BaseConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.GET, config, extra);
  }

  async post<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.POST, config, extra);
  }

  async delete<T>(config: DeleteConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.DELETE, config, extra);
  }

  async put<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.PUT, config, extra);
  }

  async patch<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.PATCH, config, extra);
  }

  private async request<T>(
    method: HttpMethods,
    config: BaseConfig | PostConfig,
    extra: AxiosRequestConfig = {}
  ): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      method,
      url: config.url,
      params: config.params || {},
      ...extra
    };
    if (
      method === HttpMethods.POST ||
      method === HttpMethods.PUT ||
      method === HttpMethods.PATCH ||
      method === HttpMethods.DELETE
    ) {
      requestConfig.data = (config as PostConfig).data || {};
    }

    try {
      const result = await this.agent.request(requestConfig);

      return result.data;
    } catch (error) {
      if (error.status === 401) {
        window.location.pathname = "/login";
      }
      error.data && error.data.errors
        ? typeof error.data.errors === "string"
          ? notice("error", error.data.errors)
          : Object.keys(error.data.errors).forEach(key => {
              notice("error", `${key} ${error.data.errors[key][0]}`);
            })
        : notice("error", error.data.message);
      throw error;
    }
  }
}
