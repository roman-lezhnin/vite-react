import { RestHttpClient } from "src/data/api/rest";
import { Repository } from "src/data/repository";
import { inject } from "src/core/di/container";
import type { AuthResponse } from "src/data/api/res/auth";

export class AuthRepository extends Repository {
  static dependencyId(): symbol {
    return Symbol.for("AuthRepository");
  }

  readonly http!: RestHttpClient;

  constructor() {
    super();
    inject(this, "http", RestHttpClient.dependencyId());
  }

  login(login: string, email: string, password: string) {
    return this.http.post<AuthResponse>("/login", { login, email, password });
  }

  logout() {
    return this.http.post("/logout", {});
  }
}
