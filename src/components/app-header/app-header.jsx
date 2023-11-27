import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} pt-4 pb-4`}>
        <ul>
          <li>
            <a
              href="/"
              className={`${styles.link} ${styles.active} text text_type_main-default pt-4 pb-4 pl-5 pr-5 mr-2`}
            >
              <BurgerIcon />
              Конструктор
            </a>
          </li>
          <li>
            <a
              href="/"
              className={`${styles.link} text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
            >
              <ListIcon />
              Лента заказов
            </a>
          </li>
        </ul>
        <a href="/">
          <Logo />
        </a>
        <ul className="justify-content-end">
          <li>
            <a
              href="/"
              className={`${styles.link} text text_type_main-default pt-4 pb-4 pl-5 pr-5`}
            >
              <ProfileIcon type="secondary" />
              Личный кабинет
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
