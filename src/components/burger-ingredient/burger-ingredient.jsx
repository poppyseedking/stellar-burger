import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const burgerIngredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

function BurgerIngredient(props) {
  return (
    <div className="text-center mt-4 mb-4 ml-3 mr-3">
      <div
        style={{
          position: "relative",
          display: props.count ? "block" : "none",
        }}
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
