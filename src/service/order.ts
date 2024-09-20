import { observable, runInAction } from "mobx";
import { autowired, service } from "ecmascript-ioc";
import { ServiceViewModel } from "src/service";
import { OrderRepository } from "src/data/repository/order";
import type { Order } from "src/data/model/order";

@service("OrderService")
export class OrderService extends ServiceViewModel {
  @autowired("OrderRepository")
  readonly repository!: OrderRepository;

  @observable accessor orders: Order[] = [];

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
