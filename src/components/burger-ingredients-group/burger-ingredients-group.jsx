import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients-group.module.css";
import PropTypes from "prop-types";
import { burgerIngredientPropTypes } from "../../utils/types.js";

function BurgerIngredientsGroup(props) {
  return (
    <>
      <h2 className="text text_type_main-medium">{props.children}</h2>
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
}

BurgerIngredientsGroup.propTypes = {
  ingredientsData: PropTypes.arrayOf({
    ...burgerIngredientPropTypes,
    count: PropTypes.number,
  }),
};

export default BurgerIngredientsGroup;
