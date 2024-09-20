import { ok, err } from "neverthrow";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import type { NetworkResponse, NetworkResponseErrors } from "src/data/api";

export abstract class HttpClient {
  protected http: AxiosInstance;

  constructor(options: AxiosRequestConfig) {
    this.http = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      ...options,
    });
  }

  delete<T = void>(url: string, params?: URLSearchParams): NetworkResponse<T> {
    return this.request<T>({
      method: "delete",
      params,
      url,
    });
  }

  get<T = void>(url: string, params?: URLSearchParams): NetworkResponse<T> {
    return this.request<T>({
      method: "get",
      params,
      url,
    });
  }

  post<T = void>(url: string, data?: object): NetworkResponse<T> {
    return this.request<T>({
      data,
      method: "post",
      url,
    });
  }

  patch<T = void>(url: string, data?: object): NetworkResponse<T> {
    return this.request<T>({
      data,
      method: "patch",
      url,
    });
  }

  put<T = void>(url: string, data?: object): NetworkResponse<T> {
    return this.request<T>({
      data,
      method: "put",
      url,
    });
  }

  private async request<T>(req: AxiosRequestConfig): NetworkResponse<T> {
    try {
      const response = await this.http.request<T>(req);
      if (response.status >= 200 && response.status <= 299) {
        return ok(response.data);
      } else {
        return err(response.data as NetworkResponseErrors);
      }
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data) {
        return err(error.response.data);
      }
      return err({ errors: [] });
    }
  }
}
