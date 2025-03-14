import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "../services/store";
import { logout } from "../services/actions/user";

function Profile() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  const [title, setTitle] = useState("");

  return (
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
  );
}
export { Profile };
