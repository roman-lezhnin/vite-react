import React from "react";
import { mock, instance } from "ts-mockito";
import { render, screen } from "@testing-library/react";
import { container } from "src/core/di/container";
import { AuthService } from "src/service/auth";
import App from "./Auth";

describe("<App/>", () => {
  const service = instance(mock(AuthService));

  beforeEach(() => {
    container.snapshot();
    container.bind<AuthService>(AuthService.dependencyId()).toValue(service);
  });

  afterEach(() => {
    container.restore();
  });

  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/Learn React/i);
    expect(linkElement.textContent).toBe("Learn React");
  });
});
