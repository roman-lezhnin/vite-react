import { observable, runInAction } from "mobx";
import { autowired, service } from "ecmascript-ioc";
import { ServiceViewModel } from "src/service";
import { AuthRepository } from "src/data/repository/auth";

@service("AuthService")
export class AuthService extends ServiceViewModel {
  @autowired("AuthRepository")
  readonly repository!: AuthRepository;

  @observable accessor isAuth: boolean = false;
  @observable accessor jwt: string = "";

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
