import * as Yup from "yup";
import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { redirect } from "react-router-dom";
import { Formik, Form, Field, FormikErrors } from "formik";
import { useDependency } from "src/core/di/container";
import { AuthError } from "src/data/api/error/AuthError";
import { AuthService } from "src/service/auth";
import { Route } from "src/ui/router/path";
import { mapErrors } from "src/ui/component/map-errors";
import FieldError from "src/ui/component/field-error";
import styles from "./Auth.module.css";

type AuthFormData = {
  login: string;
  email: string;
  password: string;
};
type AuthFormErrors = FormikErrors<AuthFormData>;

const initialValues: AuthFormData = { login: "", email: "", password: "" };
const validationSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

function Auth(): JSX.Element {
  const service = useDependency<AuthService>(AuthService.dependencyId());
  const { isPending, isSuccess, errors } = service;

  const apiErrors = useMemo(
    () => mapErrors<AuthFormErrors>(errors, keySelector),
    [errors],
  );

  async function onSubmit({ login, email, password }: AuthFormData) {
    await service.login(login, email, password);
    if (isSuccess) {
      redirect(Route.dashboard);
    }
  }

  return (
    <>
      <header>Logo</header>
      <main>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ touched, errors: formErrors }) => (
            <Form className={styles.form}>
              <Field name="login" type="text" />
              {touched.login && (
                <FieldError
                  apiError={apiErrors.login}
                  formError={formErrors.login}
                />
              )}
              <Field name="email" type="email" />
              {touched.email && (
                <FieldError
                  apiError={apiErrors.email}
                  formError={formErrors.email}
                />
              )}
              <Field name="password" type="password" />
              {touched.password && (
                <FieldError
                  apiError={apiErrors.password}
                  formError={formErrors.password}
                />
              )}
              <button type="submit" disabled={isPending}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}

function keySelector(error: string) {
  switch (error) {
    case AuthError.INVALID_LOGIN: {
      return "login";
    }
    case AuthError.INVALID_EMAIL: {
      return "email";
    }
    case AuthError.INVALID_PASSWORD: {
      return "password";
    }
    default:
      return "default";
  }
}

const ObservableComponent = observer(Auth);

export default ObservableComponent;
