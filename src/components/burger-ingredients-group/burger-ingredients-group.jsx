import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients-group.module.css";
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
  count: PropTypes.number,
});

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
  ingredientsData: PropTypes.arrayOf(burgerIngredientPropTypes),
};

export default BurgerIngredientsGroup;
