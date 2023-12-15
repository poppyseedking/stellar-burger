import { useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";

const IngredientDetails = () => {
  const ingredient = useSelector((store) => store.currentIngredient.ingredient);

  return (
    <div className="text-center">
      <img
        className={styles.img}
        src={ingredient.image_large}
        alt={ingredient.name}
      />
      <p className="mt-4 mb-8 text text_type_main-medium">{ingredient.name}</p>
      <div className="text text_type_main-default text_color_inactive d-flex justify-content-between pb-5">
        <div>
          <div className="pb-2">Калории, ккал</div>
          <span className="text text_type_digits-default">
            {ingredient.calories}
          </span>
        </div>
        <div>
          <div className="pb-2">Белки, г</div>
          <span className="text text_type_digits-default">
            {ingredient.proteins}
          </span>
        </div>
        <div>
          <div className="pb-2">Жиры, г</div>
          <span className="text text_type_digits-default">
            {ingredient.fat}
          </span>
        </div>
        <div>
          <div className="pb-2">Углеводы, г</div>
          <span className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
