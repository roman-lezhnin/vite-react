import { observable, runInAction } from "mobx";
import { ServiceViewModel } from "src/service";
import { inject } from "src/core/di/container";
import { OrderRepository } from "src/data/repository/order";
import type { Order } from "src/data/model/order";

export class OrderService extends ServiceViewModel {
  static dependencyId(): symbol {
    return Symbol.for("OrderService");
  }

  readonly repository!: OrderRepository;

  @observable accessor orders: Order[] = [];

  constructor() {
    super();
    inject(this, "repository", OrderRepository.dependencyId());
  }

  async getOrders() {
    this.pending();
    const response = await this.repository.getAll();
    response
      .map((orders) => {
        runInAction(() => {
          this.orders = orders;
        });
        this.onSuccess();
      })
      .mapErr((errors) => {
        runInAction(() => {
          this.orders = [];
        });
        this.onError(errors);
      });
  }
}
