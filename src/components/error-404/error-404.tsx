import styles from "./error-404.module.css";
import image404 from "../../images/404.svg";

function Error404() {
  return (
    <div className="text-center">
      <img src={image404} alt="Error 404" className={`${styles.icon} mb-10`} />
      <h1 className="text text_type_main-large text-center">
        Страница не найдена
      </h1>
    </div>
  );
}
export default Error404;
