import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TabContent from "../tab-content/tab-content";
import BurgerIngredientsGroup from "../burger-ingredients-group/burger-ingredients-group";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import {
  burgerIngredientPropTypes,
  dataLoadingStatusPropType,
} from "../../utils/types.js";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bun");

  return (
    <section className={`${styles.main_section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className="d-flex mb-10">
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      {props.dataLoadingStatus === "error" ? (
        <p className="text text_type_main-default text_color_inactive">
          Список ингредиентов потерялся, но скоро мы его найдём
        </p>
      ) : (
        props.dataLoadingStatus === "loaded" && (
          <div className={`${styles.scrollable} custom-scroll`}>
            <TabContent active={current === "bun"}>
              <BurgerIngredientsGroup
                ingredientsData={props.ingredientsData
                  .filter((item) => item.type === "bun")
                  .map((item) => {
                    return {
                      ...item,
                      count: props.selectedIngredients.filter(
                        (el) => el === item._id
                      ).length,
                    };
                  })}
              >
                Булки
              </BurgerIngredientsGroup>
            </TabContent>
            <TabContent active={current === "sauce"}>
              <BurgerIngredientsGroup
                ingredientsData={props.ingredientsData
                  .filter((item) => item.type === "sauce")
                  .map((item) => {
                    return {
                      ...item,
                      count: props.selectedIngredients.filter(
                        (el) => el === item._id
                      ).length,
                    };
                  })}
              >
                Соусы
              </BurgerIngredientsGroup>
            </TabContent>
            <TabContent active={current === "main"}>
              <BurgerIngredientsGroup
                ingredientsData={props.ingredientsData
                  .filter((item) => item.type === "main")
                  .map((item) => {
                    return {
                      ...item,
                      count: props.selectedIngredients.filter(
                        (el) => el === item._id
                      ).length,
                    };
                  })}
              >
                Начинки
              </BurgerIngredientsGroup>
            </TabContent>
          </div>
        )
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.string),
  ingredientsData: PropTypes.arrayOf(burgerIngredientPropTypes),
  dataLoadingStatus: dataLoadingStatusPropType,
};

export default BurgerIngredients;
