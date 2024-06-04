import { Dependency } from "src/core/di/dependency";
import type { HttpClient } from "src/data/api/http";

export abstract class Repository extends Dependency {
  abstract readonly http: HttpClient;
}
