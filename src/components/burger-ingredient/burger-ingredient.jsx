import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import { burgerIngredientPropTypes } from "../../utils/types.js";

function BurgerIngredient(props) {
  return (
    <div className="text-center mt-4 mb-4 ml-3 mr-3">
      <div
        className={`${styles.counter_wrap} ${props.count && styles.visible}`}
      >
        <Counter count={props.count} size="default" extraClass="m-1" />
      </div>
      <img src={props.ingredient.image} alt={props.ingredient.name} />
      <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
        <span className="text text_type_digits-default mr-2">
          {props.ingredient.price}
        </span>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default">{props.ingredient.name}</p>
    </div>
  );
}

BurgerIngredient.propTypes = {
  count: PropTypes.number,
  ingredient: burgerIngredientPropTypes.isRequired,
};

export default BurgerIngredient;
