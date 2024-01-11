import React, { useEffect } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { userUpdate } from "../services/actions/user";
import PropTypes from "prop-types";

function ProfileIndex({ title }) {
  const useTitle = (title) => {
    const { setTitle } = useOutletContext();

    useEffect(() => {
      setTitle(title);
    }, [setTitle, title]);
  };

  useTitle(title);

  const [nameDisabled, setNameDisabled] = React.useState(true);

  const [nameValue, setNameValue] = React.useState("");
  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };
  const inputNameRef = React.useRef(null);

  const [emailValue, setEmailValue] = React.useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [passwordValue, setPasswordValue] = React.useState("");
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);
  useEffect(() => {
    setNameValue(user.name);
    setEmailValue(user.email);
  }, [user]);

  var dataChanged = false;

  if (
    emailValue !== user.email ||
    nameValue !== user.name ||
    (passwordValue && passwordValue.length > 0)
  ) {
    dataChanged = true;
  }

  const onCancelEdit = () => {
    setNameValue(user.name);
    setEmailValue(user.email);
  };

  const onSave = (e) => {
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

  return (
    <React.Fragment>
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
          onIconClick={() => {
            setNameDisabled(false);
            setTimeout(() => {
              inputNameRef.current.focus();
            }, 0);
          }}
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
    </React.Fragment>
  );
}

ProfileIndex.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ProfileIndex;
