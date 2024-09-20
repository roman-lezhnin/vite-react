import { useMemo } from "react";
import { Container } from "ecmascript-ioc";

export function useDependency<T>(dependencyName: string): T {
  return useMemo(() => {
    return Container.get<T>(dependencyName);
  }, [dependencyName]);
}
