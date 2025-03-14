import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsGroup from "../burger-ingredients-group/burger-ingredients-group";
import styles from "./burger-ingredients.module.css";
import { useGetIngredientsQuery } from "../../services/api";
import { useSelector } from "../../services/store";
import { IIngredient } from "../../utils/types";

function BurgerIngredients() {
  const {
    isLoading: loading,
    error,
    data: ingredientsData,
  } = useGetIngredientsQuery("");

  const selectedIngredients = useSelector(
    (state) => state.selectedIngredients.ingredients
  );
  const selectedBun = useSelector((state) => state.selectedIngredients.bun);

  const [current, setCurrent] = React.useState(1);

  const titleRefs = React.useRef<HTMLHeadingElement[] | null>([]);
  const tabsRef = React.useRef<HTMLDivElement | null>(null);
  const tabsScrollHandle = () => {
    const offset = 100;
    const tabPosY = tabsRef.current
      ? tabsRef.current.getBoundingClientRect().y
      : 0;

    if (titleRefs.current) {
      if (titleRefs.current[1].getBoundingClientRect().y - offset <= tabPosY) {
        setCurrent(1);
      }
      if (titleRefs.current[2].getBoundingClientRect().y - offset <= tabPosY) {
        setCurrent(2);
      }
      if (titleRefs.current[3].getBoundingClientRect().y - offset <= tabPosY) {
        setCurrent(3);
      }
    }
  };
  const tabClickHandle = (type: number) => {
    if (titleRefs.current) {
      titleRefs.current[type].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={`${styles.main_section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="d-flex mb-10">
        <Tab
          value="bun"
          active={current === 1}
          onClick={() => tabClickHandle(1)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === 2}
          onClick={() => tabClickHandle(2)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === 3}
          onClick={() => tabClickHandle(3)}
        >
          Начинки
        </Tab>
      </div>
      {!loading && error ? (
        <p className="text text_type_main-default text_color_inactive">
          Список ингредиентов потерялся, но скоро мы его найдём
        </p>
      ) : (
        !loading &&
        !error &&
        ingredientsData["data"] && (
          <div
            ref={tabsRef}
            onScroll={tabsScrollHandle}
            className={`${styles.scrollable} custom-scroll`}
          >
            <BurgerIngredientsGroup
              ref={titleRefs}
              type={1}
              ingredientsData={ingredientsData["data"]
                .filter((item: IIngredient) => item.type === "bun")
                .map((item: IIngredient) => {
                  return {
                    ...item,
                    count: selectedBun && selectedBun._id === item._id ? 2 : 0,
                  };
                })}
            >
              Булки
            </BurgerIngredientsGroup>
            <BurgerIngredientsGroup
              ref={titleRefs}
              type={2}
              ingredientsData={ingredientsData["data"]
                .filter((item: IIngredient) => item.type === "sauce")
                .map((item: IIngredient) => {
                  return {
                    ...item,
                    count: selectedIngredients.filter(
                      (el) => el._id === item._id
                    ).length,
                  };
                })}
            >
              Соусы
            </BurgerIngredientsGroup>
            <BurgerIngredientsGroup
              ref={titleRefs}
              type={3}
              ingredientsData={ingredientsData["data"]
                .filter((item: IIngredient) => item.type === "main")
                .map((item: IIngredient) => {
                  return {
                    ...item,
                    count: selectedIngredients.filter(
                      (el) => el._id === item._id
                    ).length,
                  };
                })}
            >
              Начинки
            </BurgerIngredientsGroup>
          </div>
        )
      )}
    </section>
  );
}

export default BurgerIngredients;
