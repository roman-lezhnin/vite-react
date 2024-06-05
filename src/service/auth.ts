import { observable, runInAction } from "mobx";
import { ServiceViewModel } from "src/service";
import { inject } from "src/core/di/container";
import { AuthRepository } from "src/data/repository/auth";

export class AuthService extends ServiceViewModel {
  static dependencyId(): symbol {
    return Symbol.for("AuthService");
  }

  readonly repository!: AuthRepository;

  @observable accessor isAuth: boolean = false;
  @observable accessor jwt: string = "";

  constructor() {
    super();
    inject(this, "repository", AuthRepository.dependencyId());
  }

  async login(login: string, email: string, password: string) {
    this.pending();
    const response = await this.repository.login(login, email, password);
    response
      .map(({ jwt }) => {
        runInAction(() => {
          this.jwt = jwt;
          this.isAuth = true;
        });
        this.onSuccess();
      })
      .mapErr(this.onError);
  }

  async logout() {
    this.pending();
    const response = await this.repository.logout();
    response
      .map(() => {
        runInAction(() => {
          this.jwt = "";
          this.isAuth = false;
        });
        this.onSuccess();
      })
      .mapErr(this.onError);
  }
}
