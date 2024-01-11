import React, { useState } from "react";
import AppHeader from "../components/app-header/app-header";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../services/actions/user";

function Profile() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  const [title, setTitle] = useState("");

  return (
    <React.Fragment>
      <AppHeader />
      <main className="profile-page p-5">
        <div className="pt-20">
          <p className="text text_type_main-medium text_color_inactive mb-20">
            <NavLink
              to="/profile"
              className="light-nav-link pt-4 pb-4 d-block"
              end
            >
              Профиль
            </NavLink>
            <NavLink
              to="/profile/orders"
              className="light-nav-link pt-4 pb-4 d-block"
            >
              История заказов
            </NavLink>
            <button
              type="button"
              onClick={onLogout}
              className="light-nav-link pt-4 pb-4 d-block text text_type_main-medium text_color_inactive"
            >
              Выход
            </button>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {title}
          </p>
        </div>
        <div className="pt-20">
          <Outlet context={{ title, setTitle }} />
        </div>
      </main>
    </React.Fragment>
  );
}
export { Profile };
