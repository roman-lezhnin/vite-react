import React from "react";
import { observer } from "mobx-react-lite";
import { useDependency } from "src/core/di/container";
import { AuthService } from "src/service/auth";

function Dashboard(): JSX.Element {
  const service = useDependency<AuthService>(AuthService.dependencyId());
  return <div>Dashboard</div>;
}

const ObservableComponent = observer(Dashboard);

export default ObservableComponent;
