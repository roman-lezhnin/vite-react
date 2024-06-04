import { observable, flow } from "mobx";
import { ServiceViewModel } from "src/service";
import { inject } from "src/core/di/container";
import { AuthRepository } from "src/data/repository/auth";
import type { NetworkResponseResult } from "src/data/api";
import { debugMethod } from "src/core/utils/debug";

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
  @debugMethod
  *login() {
    this.pending();
    this.isAuth = true;
    const response: NetworkResponseResult = yield this.repository.login();
    response.map(this.success).mapErr(this.error);
  }

  @flow
  @debugMethod
  *logout() {
    this.pending();
    this.isAuth = false;
    const response: NetworkResponseResult = yield this.repository.logout();
    response.map(this.success).mapErr(this.error);
  }
}
