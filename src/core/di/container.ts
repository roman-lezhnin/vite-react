import { Container, createWire } from "@owja/ioc";
import type { Dependency } from "src/core/di/dependency";

export const container = new Container();

export const inject = createWire(container);

export function useDependency<T extends Dependency>(dependencyId: symbol): T {
  return container.get<T>(dependencyId);
}
