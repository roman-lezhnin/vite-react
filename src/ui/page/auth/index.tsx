import React, { Suspense, lazy, memo } from "react";

const Component = lazy(() => import("./Auth"));

function Page(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

const AuthPage = memo(Page);

export default AuthPage;
