import { container } from "src/core/di/container";
import { RestHttpClient } from "src/data/api/rest";
import { AuthRepository } from "src/data/repository/auth";
import { OrderRepository } from "src/data/repository/order";
import { AuthService } from "src/service/auth";
import { OrderService } from "src/service/order";

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
    container
      .bind<OrderRepository>(OrderRepository.dependencyId())
      .to(OrderRepository)
      .inSingletonScope();
  }

  private static setupServices(): void {
    container
      .bind<AuthService>(AuthService.dependencyId())
      .to(AuthService)
      .inSingletonScope();
    container
      .bind<OrderService>(OrderService.dependencyId())
      .to(OrderService)
      .inSingletonScope();
  }

  public static configure(): void {
    CompositionRoot.setupNetworkClients();
    CompositionRoot.setupRepositories();
    CompositionRoot.setupServices();
  }
}
