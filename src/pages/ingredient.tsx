import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useGetIngredientsQuery } from "../services/api";
import { Page404 } from ".";
import { IIngredient } from "../utils/types";

function Ingredient() {
  const {
    isLoading: loading,
    error,
    data: ingredientsData,
  } = useGetIngredientsQuery("");

  const { id } = useParams();

  let ingredientData = null;

  if (!loading && !error) {
    ingredientData = ingredientsData["data"].filter(
      (item: IIngredient) => item._id === id
    );
  }

  return (
    <>
      {!loading && !error && ingredientData.length === 1 && (
        <main className="main-page w-mx-640 p-5">
          <div className="text-center pt-30">
            <h1 className="text text_type_main-large mb-6">
              Детали ингредиента
            </h1>
            <IngredientDetails ingredientData={ingredientData[0]} />
          </div>
        </main>
      )}
      {!loading && !error && ingredientData.length !== 1 && <Page404 />}
    </>
  );
}
export { Ingredient };
