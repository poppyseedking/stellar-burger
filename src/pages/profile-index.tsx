import React, { ChangeEvent, FormEvent, useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { userUpdate } from "../services/actions/user";
import { AppDispatch } from "../services/store";
import { Context } from "vm";

function ProfileIndex({ title }: { title: string }) {
  const useTitle = (title: string) => {
    const { setTitle } = useOutletContext<Context>();

    useEffect(() => {
      setTitle(title);
    }, [setTitle, title]);
  };

  useTitle(title);

  const [nameDisabled, setNameDisabled] = React.useState(true);

  const [nameValue, setNameValue] = React.useState("");
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const inputNameRef = React.useRef<HTMLInputElement | null>(null);

  const [emailValue, setEmailValue] = React.useState("");
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const dispatch: AppDispatch = useDispatch();

  type RootState = {
    user: {
      user: {
        name: string;
        email: string;
      };
    };
  };

  const user = useSelector((store: RootState) => store.user.user);
  useEffect(() => {
    if (user) {
      setNameValue(user.name);
      setEmailValue(user.email);
    }
  }, [user]);

  let dataChanged = false;

  if (
    user &&
    (emailValue !== user.email ||
      nameValue !== user.name ||
      (passwordValue && passwordValue.length > 0))
  ) {
    dataChanged = true;
  }

  const onCancelEdit = () => {
    if (user) {
      setNameValue(user.name);
      setEmailValue(user.email);
    }
  };

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      userUpdate({
        email: emailValue,
        name: nameValue,
        password: passwordValue,
      })
    );
    setPasswordValue("");
  };

  const iconClickHandle = () => {
    setNameDisabled(false);
    setTimeout(() => {
      if (inputNameRef.current) {
        inputNameRef.current.focus();
      }
    });
  };

  return (
    <>
      <form onSubmit={onSave} className="d-flex flex-direction-column">
        <Input
          type={"text"}
          placeholder="Имя"
          onChange={onNameChange}
          value={nameValue}
          name={"name"}
          extraClass="mb-6"
          icon="EditIcon"
          disabled={nameDisabled}
          onIconClick={iconClickHandle}
          onBlur={() => {
            setNameDisabled(true);
          }}
          ref={inputNameRef}
        />
        <EmailInput
          onChange={onEmailChange}
          value={emailValue}
          name={"email"}
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onPasswordChange}
          value={passwordValue}
          name={"password"}
          extraClass="mb-6"
          icon="EditIcon"
        />
        {dataChanged && (
          <div className="d-flex align-items-center input_size_default justify-content-end">
            <button
              type="button"
              onClick={onCancelEdit}
              className="text text_type_main-default link clear-button mr-7"
            >
              Отмена
            </button>
            <Button htmlType="submit" type="primary" size="large">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </>
  );
}

export default ProfileIndex;
