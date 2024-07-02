import { bench, describe } from "vitest";
import { toFormikErrors } from "src/ui/component/toFormikErrors";

enum Error {
  INVALID_LOGIN = "INVALID_LOGIN",
  INVALID_EMAIL = "INVALID_EMAIL",
  INVALID_PASSWORD = "INVALID_PASSWORD",
}

function keySelector(error: string) {
  switch (error) {
    case Error.INVALID_LOGIN: {
      return "login";
    }
    case Error.INVALID_EMAIL: {
      return "email";
    }
    case Error.INVALID_PASSWORD: {
      return "password";
    }
    default:
      return "default";
  }
}

describe("toFormikErrors", () => {
  bench("benchmark", () => {
    const errors: string[] = [
      Error.INVALID_LOGIN,
      Error.INVALID_EMAIL,
      Error.INVALID_PASSWORD,
    ];
    toFormikErrors(errors, keySelector);
  });
});
