import { autowired, repository } from "ecmascript-ioc";
import { RestHttpClient } from "src/data/api/rest";
import { Repository } from "src/data/repository";
import type { NetworkResponse } from "src/data/api";
import type { Order } from "src/data/model/order";

@repository("RestHttpClient")
export class OrderRepository extends Repository {
  @autowired("RestHttpClient")
  readonly http!: RestHttpClient;

  getAll(): NetworkResponse<Order[]> {
    return this.http.get("/order");
  }
}
