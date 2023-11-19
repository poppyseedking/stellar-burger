import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients-summ.module.css";
import PropTypes from "prop-types";

function BurgerIngredientsSumm(props) {
  return (
    <div
      className={`${styles.summ} d-flex justify-content-end align-items-center mr-8 mt-10`}
    >
      <span className="mr-2 text text_type_digits-medium">{props.summ}</span>
      <CurrencyIcon />
      <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
        Оформить заказ
      </Button>
    </div>
  );
}

BurgerIngredientsSumm.propTypes = {
  summ: PropTypes.number,
};

export default BurgerIngredientsSumm;
