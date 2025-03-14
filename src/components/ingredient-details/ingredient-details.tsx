import { useGetIngredientsQuery } from "../../services/api";
import { useParams } from "react-router-dom";
import { Page404 } from "../../pages";
import { IIngredient } from "../../utils/types";
import styles from "./ingredient-details.module.css";

type TIngredientData = IIngredient[] | null;

const IngredientDetails = ({
  ingredientData,
}: {
  ingredientData: TIngredientData;
}) => {
  const {
    isLoading: loading,
    error,
    data: ingredientsData,
  } = useGetIngredientsQuery("");

  const { id } = useParams();

  if (!loading && !error) {
    ingredientData = ingredientsData["data"].filter(
      (item: IIngredient) => item._id === id
    );
  }

  return (
    <>
      {!loading && !error && ingredientData && ingredientData.length === 1 && (
        <div className="text-center">
          <img
            className={styles.img}
            src={ingredientData[0].image_large}
            alt={ingredientData[0].name}
          />
          <p className="mt-4 mb-8 text text_type_main-medium">
            {ingredientData[0].name}
          </p>
          <div className="text text_type_main-default text_color_inactive d-flex justify-content-between pb-5">
            <div>
              <div className="pb-2">Калории, ккал</div>
              <span className="text text_type_digits-default">
                {ingredientData[0].calories}
              </span>
            </div>
            <div>
              <div className="pb-2">Белки, г</div>
              <span className="text text_type_digits-default">
                {ingredientData[0].proteins}
              </span>
            </div>
            <div>
              <div className="pb-2">Жиры, г</div>
              <span className="text text_type_digits-default">
                {ingredientData[0].fat}
              </span>
            </div>
            <div>
              <div className="pb-2">Углеводы, г</div>
              <span className="text text_type_digits-default">
                {ingredientData[0].carbohydrates}
              </span>
            </div>
          </div>
        </div>
      )}
      {!loading &&
        !error &&
        (!ingredientData || ingredientData.length !== 1) && <Page404 />}
    </>
  );
};

export default IngredientDetails;
