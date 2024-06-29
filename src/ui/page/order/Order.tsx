import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useDependency } from "src/core/di/container";
import { OrderService } from "src/service/order";

function Order(): JSX.Element {
  const service = useDependency<OrderService>(OrderService.dependencyId());
  const { isPending, isError, errors, orders } = service;

  useEffect(() => {
    service.getOrders();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errors);
    }
  }, [isError, errors]);

  if (isPending) return <h1>Loading...</h1>;

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.uuid}>{order.title}</li>
        ))}
      </ul>
    </div>
  );
}

const ObservableComponent = observer(Order);

export default ObservableComponent;
