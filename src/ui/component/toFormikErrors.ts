import type { FormikErrors } from "formik";
import { from, groupByRecord } from "@szilanor/stream";

type KeySelector = (entry: string) => string;

export function toFormikErrors<T extends FormikErrors<Record<string, string>>>(
  errors: string[],
  keySelector: KeySelector
): T {
  const mapped = from(errors).collect(groupByRecord(keySelector));
  const result: FormikErrors<Record<string, string>> = {};
  for (const [key, value] of Object.entries(mapped)) {
    result[key] = value[0];
  }
  return result as T;
}
