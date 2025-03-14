import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} pt-4 pb-4`}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                [
                  styles.link,
                  isActive ? styles.active : "",
                  "text text_type_main-default pt-4 pb-4 pl-5 pr-5 mr-2",
                ].join(" ")
              }
            >
              <BurgerIcon type="primary" />
              Конструктор
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                [
                  styles.link,
                  isActive ? styles.active : "",
                  "text text_type_main-default pt-4 pb-4 pl-5 pr-5",
                ].join(" ")
              }
            >
              <ListIcon type="primary" />
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <Link to="/">
          <Logo />
        </Link>
        <ul className="justify-content-end">
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                [
                  styles.link,
                  isActive ? styles.active : "",
                  "text text_type_main-default pt-4 pb-4 pl-5 pr-5",
                ].join(" ")
              }
            >
              <ProfileIcon type="secondary" />
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
