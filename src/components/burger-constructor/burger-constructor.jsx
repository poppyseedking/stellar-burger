import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { sort as sortIngredients } from "../../services/selected-ingredients";
import BurgerIngredientsSumm from "../burger-ingredients-summ/burger-ingredients-summ";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import BugerDropBunArea from "../burger-drop-bun-area/burger-drop-bun-area";
import BugerDropIngredientArea from "../burger-drop-ingredient-area/burger-drop-ingredient-area";
import styles from "./burger-constructor.module.css";

function BurgerConstructor() {
  const dispatch = useDispatch();

  const selectedIngredients = useSelector(
    (store) => store.selectedIngredients.ingredients
  );
  const selectedBun = useSelector((store) => store.selectedIngredients.bun);

  const moveCard = useCallback(
    (fromIndex, toIndex) => {
      const ingredients = [...selectedIngredients];
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
      dispatch(sortIngredients(ingredients));
    },
    [selectedIngredients, dispatch]
  );

  return (
    <section className={`${styles.main_section} pt-25 pb-10`}>
      <BugerDropBunArea>
        <div className={`${styles.element_container} ml-8 mr-4 `}>
          {selectedBun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={selectedBun.name}
              price={selectedBun.price}
              thumbnail={selectedBun.image_mobile}
            />
          ) : (
            <div className="constructor-element constructor-element_pos_top">
              <span className="d-flex align-items-center justify-content-center pt-3">
                Перетащите понравившуюся булку
              </span>
            </div>
          )}
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
          {selectedBun ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={selectedBun.name}
              price={selectedBun.price}
              thumbnail={selectedBun.image_mobile}
            />
          ) : (
            <div className="constructor-element constructor-element_pos_bottom">
              <span className="d-flex align-items-center justify-content-center pt-3">
                Перетащите понравившуюся булку
              </span>
            </div>
          )}
        </div>
      </BugerDropBunArea>

      <BurgerIngredientsSumm
        summ={
          (selectedBun ? selectedBun.price * 2 : 0) +
          (selectedIngredients.length > 0
            ? selectedIngredients.reduce(
                (prev, current) =>
                  prev +
                  (current && current.price !== undefined ? current.price : 0),
                0
              )
            : 0)
        }
      />
    </section>
  );
}

export default BurgerConstructor;
