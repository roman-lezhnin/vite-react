import type { HttpClient } from "src/data/api/http";

export abstract class Repository {
  abstract readonly http: HttpClient;
}
