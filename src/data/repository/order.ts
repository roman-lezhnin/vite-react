import { RestHttpClient } from "src/data/api/rest";
import { Repository } from "src/data/repository";
import { inject } from "src/core/di/container";
import type { NetworkResponse } from "src/data/api";
import type { Order } from "src/data/model/order";

export class OrderRepository extends Repository {
  static dependencyId(): symbol {
    return Symbol.for("OrderRepository");
  }

  readonly http!: RestHttpClient;

  constructor() {
    super();
    inject(this, "http", RestHttpClient.dependencyId());
  }

  getAll(): NetworkResponse<Order[]> {
    return this.http.get("/order");
  }
}
