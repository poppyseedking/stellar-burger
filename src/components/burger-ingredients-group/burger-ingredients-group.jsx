import { forwardRef } from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients-group.module.css";
import PropTypes from "prop-types";
import { burgerIngredientPropTypes } from "../../utils/types.js";

const BurgerIngredientsGroup = forwardRef((props, titleRefs) => {
  return (
    <>
      <h2
        ref={(element) => {
          titleRefs.current[props.type] = element;
        }}
        className="text text_type_main-medium"
      >
        {props.children}
      </h2>
      <div className={`${styles.ingredients} mb-10`}>
        {props.ingredientsData.map((item) => (
          <BurgerIngredient
            ingredient={item}
            key={item._id}
            count={item.count}
          />
        ))}
      </div>
    </>
  );
});

BurgerIngredientsGroup.propTypes = {
  type: PropTypes.string.isRequired,
  ingredientsData: PropTypes.arrayOf(burgerIngredientPropTypes).isRequired,
  children: PropTypes.string,
};

export default BurgerIngredientsGroup;
