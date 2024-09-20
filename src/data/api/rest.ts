import { component } from "ecmascript-ioc";
import { HttpClient } from "src/data/api/http";

@component("RestHttpClient")
export class RestHttpClient extends HttpClient {
  constructor() {
    super({
      responseType: "text",
      headers: { "Content-Type": "application/json" },
      transformResponse: [
        (r) => {
          try {
            return JSON.parse(r.replace(/:(\d{16,})/g, ':"$1"'));
          } catch (error) {
            return r;
          }
        },
      ],
    });
    // this.interceptor.intercept(this.http);
  }
}
