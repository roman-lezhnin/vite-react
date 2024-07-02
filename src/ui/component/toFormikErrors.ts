import type { FormikErrors } from "formik";
import { from, groupByRecord } from "@szilanor/stream";

type KeySelector = (entry: string) => string;
type Result = FormikErrors<Record<string, unknown>>;

export function toFormikErrors(
  errors: string[],
  keySelector: KeySelector,
): Result {
  const result: Result = {};
  if (
    !Array.isArray(errors) ||
    errors.length < 1 ||
    typeof keySelector !== "function"
  ) {
    return result;
  }
  const mapped = from(errors).collect(groupByRecord(keySelector));
  for (const [key, value] of Object.entries(mapped)) {
    result[key] = value[0];
  }
  return result;
}
