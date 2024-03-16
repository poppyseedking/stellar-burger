import React, { ChangeEvent } from "react";
import AppHeader from "../components/app-header/app-header";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { register as registerAction } from "../services/actions/user";
import { AppDispatch } from "../services/store";

function Register() {
  const [nameValue, setNameValue] = React.useState("");
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const [emailValue, setEmailValue] = React.useState("");
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const dispatch: AppDispatch = useDispatch();

  const onRegister = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerAction({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <>
      <AppHeader />
      <main className="main-page p-5">
        <div className="text-center pt-30">
          <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
          <form onSubmit={onRegister}>
            <div className="d-flex flex-direction-column align-items-center">
              <Input
                type={"text"}
                placeholder="Имя"
                onChange={onNameChange}
                value={nameValue}
                name={"name"}
                extraClass="mb-6"
              />
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
              Зарегистрироваться
            </Button>
          </form>
          <p className="text text_type_main-default text_color_inactive mt-20">
            Уже зарегистрированы?{" "}
            <Link to="/login" className="link">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
export { Register };
