import React, { Suspense, lazy, memo } from "react";

const Component = lazy(() => import("./Dashboard"));

function Page(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

const DashboardPage = memo(Page);

export default DashboardPage;
