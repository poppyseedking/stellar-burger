import { useCallback } from "react";
import { useSelector, useDispatch } from "../../services/store";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { sort as sortIngredients } from "../../services/selected-ingredients";
import BurgerIngredientsSumm from "../burger-ingredients-summ/burger-ingredients-summ";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import BugerDropBunArea from "../burger-drop-bun-area/burger-drop-bun-area";
import BugerDropIngredientArea from "../burger-drop-ingredient-area/burger-drop-ingredient-area";
import styles from "./burger-constructor.module.css";
import { IIngredient } from "../../utils/types";

type TBun = IIngredient | null;

function BurgerConstructor() {
  const dispatch = useDispatch();

  const selectedIngredients: IIngredient[] = useSelector(
    (store) => store.selectedIngredients.ingredients
  );

  const selectedBun: TBun = useSelector(
    (store) => store.selectedIngredients.bun
  );

  const moveCard = useCallback(
    (fromIndex: number, toIndex: number) => {
      const ingredients = [...selectedIngredients];
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
      dispatch(sortIngredients(ingredients));
    },
    [selectedIngredients, dispatch]
  );

  const bunElemet = (selectedBun: TBun, position: "top" | "bottom") => {
    if (selectedBun) {
      let positionPostscript = position === "top" ? "(верх)" : "(низ)";
      return (
        <ConstructorElement
          type={position}
          isLocked={true}
          text={`${selectedBun.name} (${positionPostscript})`}
          price={selectedBun.price}
          thumbnail={selectedBun.image_mobile}
        />
      );
    } else {
      return (
        <div
          className={`constructor-element constructor-element_pos_${position}`}
        >
          <span className="d-flex align-items-center justify-content-center pt-3">
            Перетащите понравившуюся булку
          </span>
        </div>
      );
    }
  };

  const calcSumm = (selectedBun: TBun, selectedIngredients: IIngredient[]) => {
    return (
      (selectedBun ? selectedBun.price * 2 : 0) +
      (selectedIngredients.length > 0
        ? selectedIngredients.reduce(
            (prev, current) =>
              prev +
              (current && current.price !== undefined ? current.price : 0),
            0
          )
        : 0)
    );
  };

  return (
    <section className={`${styles.main_section} pt-25 pb-10`}>
      <BugerDropBunArea>
        <div className={`${styles.element_container} ml-8 mr-4 `}>
          {bunElemet(selectedBun, "top")}
        </div>
      </BugerDropBunArea>

      <BugerDropIngredientArea>
        {selectedIngredients.length !== 0 ? (
          selectedIngredients.map((item, index) => {
            return (
              <BurgerConstructorIngredient
                item={item}
                key={item.id}
                id={item.id}
                index={index}
                moveCard={moveCard}
              />
            );
          })
        ) : (
          <div className="constructor-element ml-8">
            <span className="d-flex align-items-center justify-content-center pt-3">
              Перетащите начинки и соусы
            </span>
          </div>
        )}
      </BugerDropIngredientArea>

      <BugerDropBunArea>
        <div className={`${styles.element_container} ml-8 mr-4 `}>
          {bunElemet(selectedBun, "bottom")}
        </div>
      </BugerDropBunArea>

      <BurgerIngredientsSumm
        summ={calcSumm(selectedBun, selectedIngredients)}
      />
    </section>
  );
}

export default BurgerConstructor;
