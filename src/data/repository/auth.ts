import { autowired, repository } from "ecmascript-ioc";
import { RestHttpClient } from "src/data/api/rest";
import { Repository } from "src/data/repository";
import type { AuthResponse } from "src/data/api/res/auth";

@repository("AuthRepository")
export class AuthRepository extends Repository {
  @autowired("RestHttpClient")
  readonly http!: RestHttpClient;

  login(login: string, email: string, password: string) {
    return this.http.post<AuthResponse>("/login", { login, email, password });
  }

  logout() {
    return this.http.post("/logout", {});
  }
}
