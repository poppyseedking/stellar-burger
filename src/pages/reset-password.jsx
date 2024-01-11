import React from "react";
import AppHeader from "../components/app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { api } from "../utils/user-api";

function ResetPassword() {
  const [codeValue, setCodeValue] = React.useState("");
  const onCodeChange = (e) => {
    setCodeValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const [isResetSend, setIsResetSend] = React.useState(false);

  const onResetPass = (e) => {
    e.preventDefault();
    api
      .resetPassword({
        token: codeValue,
        password: passwordValue,
      })
      .then((res) => {
        if (res.success) {
          setIsResetSend(true);
        }
      });
  };

  if (isResetSend) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <React.Fragment>
      <AppHeader />
      <main className="main-page p-5">
        <div className="text-center pt-30">
          <h1 className="text text_type_main-medium mb-6">
            Восстановление пароля
          </h1>
          <form onSubmit={onResetPass}>
            <div className="d-flex flex-direction-column align-items-center">
              <PasswordInput
                placeholder="Введите новый пароль"
                onChange={onPasswordChange}
                value={passwordValue}
                name={"password"}
                extraClass="mb-6"
              />
              <Input
                type={"text"}
                placeholder="Введите код из письма"
                onChange={onCodeChange}
                value={codeValue}
                name={"code"}
                extraClass="mb-6"
              />
            </div>
            <Button htmlType="submit" type="primary" size="large">
              Сохранить
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
    </React.Fragment>
  );
}
export { ResetPassword };
