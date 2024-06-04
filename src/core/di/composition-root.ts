import { container } from "src/core/di/container";
import { RestHttpClient } from "src/data/api/rest";
import { AuthRepository } from "src/data/repository/auth";
import { AuthService } from "src/service/auth";

export class CompositionRoot {
  private static setupNetworkClients(): void {
    container
      .bind<RestHttpClient>(RestHttpClient.dependencyId())
      .to(RestHttpClient)
      .inSingletonScope();
  }

  private static setupRepositories(): void {
    container
      .bind<AuthRepository>(AuthRepository.dependencyId())
      .to(AuthRepository)
      .inSingletonScope();
  }

  private static setupServices(): void {
    container
      .bind<AuthService>(AuthService.dependencyId())
      .to(AuthService)
      .inSingletonScope();
  }

  public static configure(): void {
    CompositionRoot.setupNetworkClients();
    CompositionRoot.setupRepositories();
    CompositionRoot.setupServices();
  }
}
