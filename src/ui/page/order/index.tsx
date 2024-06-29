import React, { Suspense, lazy, memo } from "react";

const Component = lazy(() => import("./Order"));

function Page(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

const OrderPage = memo(Page);

export default OrderPage;
