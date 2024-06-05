import { observable, flow } from "mobx";
import { ServiceViewModel } from "src/service";
import { inject } from "src/core/di/container";
import { AuthRepository } from "src/data/repository/auth";
import type { ServiceResponse } from "src/service/utils/types";
import type { AuthResponse } from "src/data/api/res/auth/auth";

type AuthFormData = {
  login: string;
  email: string;
  password: string;
};

export class AuthService extends ServiceViewModel {
  static dependencyId(): symbol {
    return Symbol.for("AuthService");
  }

  readonly repository!: AuthRepository;

  @observable accessor isAuth: boolean = false;
  @observable accessor jwt: string = "";

  @observable accessor formData: AuthFormData = {
    login: "",
    email: "",
    password: "",
  };

  constructor() {
    super();
    inject(this, "repository", AuthRepository.dependencyId());
  }

  @flow
  *login(): ServiceResponse<AuthResponse> {
    this.pending();
    const response = yield this.repository.login();
    response
      .map(({ jwt }) => {
        this.jwt = jwt;
        this.isAuth = true;
        this.onSuccess();
      })
      .mapErr(this.onError);
  }

  @flow
  *logout(): ServiceResponse {
    this.pending();
    const response = yield this.repository.logout();
    response
      .map(() => {
        this.jwt = "";
        this.isAuth = false;
        this.onSuccess();
      })
      .mapErr(this.onError);
  }
}
