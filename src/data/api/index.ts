import type { Result } from "neverthrow";

export type NetworkResponseResult<T = void> = Result<T, Error>;
export type NetworkResponse<T = void> = Promise<NetworkResponseResult<T>>;
