import type { NetworkResponse, NetworkResponseResult } from "src/data/api";

export type ServiceResponse<ResponseBody = void> = Generator<
  NetworkResponse<ResponseBody>,
  void,
  NetworkResponseResult<ResponseBody>
>;
