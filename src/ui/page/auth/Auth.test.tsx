import React from "react";
import { mock, instance, when } from "ts-mockito";
import { render, screen } from "@testing-library/react";
import { AuthService } from "src/service/auth";
import App from "./Auth";

describe("<Auth/>", () => {
  const service = mock(AuthService);

  // beforeEach(() => {
  //   container.snapshot();
  //   container
  //     .bind<AuthService>(AuthService.dependencyId())
  //     .toValue(instance(service));
  // });

  // afterEach(() => {
  //   container.restore();
  // });

  test("renders Logo in header", () => {
    when(service.errors).thenReturn([]);
    render(<App />);
    const header = screen.getByText(/Logo/i);
    expect(header.textContent).toBe("Logo");
  });
});
