import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsGroup from "../burger-ingredients-group/burger-ingredients-group";
import styles from "./burger-ingredients.module.css";
import { useGetIngredientsQuery } from "../../services/api";
import { useSelector } from "react-redux";

function BurgerIngredients() {
  const {
    isLoading: loading,
    error,
    data: ingredientsData,
  } = useGetIngredientsQuery();

  const selectedIngredients = useSelector(
    (state) => state.selectedIngredients.ingredients
  );
  const selectedBun = useSelector((state) => state.selectedIngredients.bun);

  const [current, setCurrent] = React.useState("bun");

  const titleRefs = React.useRef([]);
  const tabsRef = React.useRef();
  const tabsScrollHandle = (e) => {
    const offset = 100;
    const tabPosY = tabsRef.current.getBoundingClientRect().y;
    for (var type in titleRefs.current) {
      if (
        titleRefs.current[type].getBoundingClientRect().y - offset <=
        tabPosY
      ) {
        setCurrent(type);
      }
    }
  };
  const tabClickHandle = (type) => {
    titleRefs.current[type].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={`${styles.main_section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="d-flex mb-10">
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => tabClickHandle("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => tabClickHandle("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => tabClickHandle("main")}
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
              type="bun"
              ingredientsData={ingredientsData["data"]
                .filter((item) => item.type === "bun")
                .map((item) => {
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
              type="sauce"
              ingredientsData={ingredientsData["data"]
                .filter((item) => item.type === "sauce")
                .map((item) => {
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
              type="main"
              ingredientsData={ingredientsData["data"]
                .filter((item) => item.type === "main")
                .map((item) => {
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
