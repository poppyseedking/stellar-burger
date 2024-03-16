import React, { ChangeEvent } from "react";
import AppHeader from "../components/app-header/app-header";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { api } from "../utils/user-api";

function ForgotPassword() {
  const [emailValue, setEmailValue] = React.useState("");
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const [isForgotSend, setIsForgotSend] = React.useState(false);

  const onForgotPass = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .forgotPassword({
        email: emailValue,
      })
      .then((res) => {
        if (res.success) {
          setIsForgotSend(true);
        }
      });
  };

  const location = useLocation();

  if (isForgotSend) {
    return (
      <Navigate
        to="/reset-password"
        replace={true}
        state={{ from: location }}
      />
    );
  }

  return (
    <>
      <AppHeader />
      <main className="main-page p-5">
        <div className="text-center pt-30">
          <h1 className="text text_type_main-medium mb-6">
            Восстановление пароля
          </h1>
          <form onSubmit={onForgotPass}>
            <div className="d-flex flex-direction-column align-items-center">
              <EmailInput
                placeholder="Укажите E-mail"
                onChange={onEmailChange}
                value={emailValue}
                name={"email"}
                isIcon={false}
                extraClass="mb-6"
              />
            </div>
            <Button htmlType="submit" type="primary" size="large">
              Восстановить
            </Button>
          </form>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Вспомнили пароль?{" "}
            <Link to="/login" className="link">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
export { ForgotPassword };
