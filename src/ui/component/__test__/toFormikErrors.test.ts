import { expect, test } from "vitest";
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

test("toFormikErrors_keySelector", () => {
  // arrange
  const errors: string[] = [Error.INVALID_LOGIN, Error.INVALID_EMAIL];
  const expected = {
    login: Error.INVALID_LOGIN,
    email: Error.INVALID_EMAIL,
  };
  // act
  const actual = toFormikErrors(errors, keySelector);
  // assert
  expect(actual).toEqual(expected);
});

test("toFormikErrors_emptyErrors", () => {
  // arrange
  const errors: string[] = [];
  const expected = {};
  // act
  const actual = toFormikErrors(errors, keySelector);
  // assert
  expect(actual).toEqual(expected);
});

test("toFormikErrors_invalidErrors", () => {
  // arrange
  const expected = {};
  // act
  const actual = toFormikErrors(null, keySelector);
  // assert
  expect(actual).toEqual(expected);
});

test("toFormikErrors_invalidKeySelector", () => {
  // arrange
  const errors: string[] = [Error.INVALID_PASSWORD];
  const expected = {};
  // act
  const actual = toFormikErrors(errors, null);
  // assert
  expect(actual).toEqual(expected);
});
