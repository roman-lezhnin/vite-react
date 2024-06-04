import { RestHttpClient } from "src/data/api/rest";
import { Repository } from "src/data/repository";
import { inject } from "src/core/di/container";

export class AuthRepository extends Repository {
  static dependencyId(): symbol {
    return Symbol.for("AuthRepository");
  }

  readonly http!: RestHttpClient;

  constructor() {
    super();
    inject(this, "http", RestHttpClient.dependencyId());
  }

  login() {
    return this.http.post("/login", {});
  }

  logout() {
    return this.http.post("/logout", {});
  }
}
