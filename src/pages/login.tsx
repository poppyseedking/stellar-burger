import React, { ChangeEvent, FormEvent, FormEventHandler } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { useDispatch } from "../services/store";
import { login as loginAction } from "../services/actions/user";

function Login() {
  const [emailValue, setEmailValue] = React.useState("");
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const dispatch = useDispatch();

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      loginAction({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <main className="main-page p-5">
      <div className="text-center pt-30">
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <form onSubmit={onLogin}>
          <div className="d-flex flex-direction-column align-items-center">
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={"email"}
              isIcon={false}
              extraClass="mb-6"
            />
            <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={"password"}
              extraClass="mb-6"
            />
          </div>
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4 mt-20">
          Вы — новый пользователь?{" "}
          <Link to="/register" className="link">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className="link">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
}
export { Login };
