import React from "react";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDependency } from "src/core/di/container";
import { AuthService } from "src/service/auth";
import { Route } from "src/ui/router/path";

const authValidationSchema = Yup.object().shape({
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
  const { isPending } = service;

  function login(): void {
    service.login();
    // redirect(Route.dashboard);
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav>nav</nav>
      </header>
      <main>
        <Formik
          initialValues={{
            login: "login",
            email: "email@email.ru",
            password: "password",
          }}
          validationSchema={authValidationSchema}
          onSubmit={(values) => {
            console.log(values);
            login();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="login" type="text" />
              {errors.login && touched.login && <div>{errors.login}</div>}
              <Field name="email" type="email" />
              {errors.email && touched.email && <div>{errors.email}</div>}
              <Field name="password" type="password" />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}
              <button type="submit" disabled={isPending}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

const ObservableComponent = observer(Auth);

export default ObservableComponent;
