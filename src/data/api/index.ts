import type { Result } from "neverthrow";

export type NetworkResponseErrors = { errors: string[] };

export type NetworkResponseResult<NetworkResponseBody = void> = Result<
  NetworkResponseBody,
  NetworkResponseErrors
>;

export type NetworkResponse<NetworkResponseBody = void> = Promise<
  NetworkResponseResult<NetworkResponseBody>
>;
