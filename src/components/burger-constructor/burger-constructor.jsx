import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsSumm from "../burger-ingredients-summ/burger-ingredients-summ";
import styles from "./burger-constructor.module.css";
import burgerBunImg from "../../images/bun.png";
import PropTypes from "prop-types";
import {
  burgerIngredientPropTypes,
  dataLoadingStatusPropType,
} from "../../utils/types.js";

function BurgerConstructor(props) {
  return (
    <section className={`${styles.main_section} pt-25 pb-10`}>
      {props.dataLoadingStatus === "loaded" && (
        <div className={`${styles.element_container} ml-8 mr-4 `}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={1255}
            thumbnail={burgerBunImg}
          />
        </div>
      )}
      {props.dataLoadingStatus === "loaded" && (
        <div
          className={`${styles.selected_ingredients} custom-scroll mt-4 mb-4 pr-2`}
        >
          {props.selectedIngredients.map((item_id, index) => {
            let item = props.ingredientsData.find(
              (item) => item._id === item_id && item.type !== "bun"
            );
            if (item)
              return (
                <div className={styles.element_container} key={index}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    key={item._id}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image_mobile}
                    extraClass="ml-2"
                  />
                </div>
              );
          })}
        </div>
      )}
      {props.dataLoadingStatus === "loaded" && (
        <div className={`${styles.element_container} ml-8 mr-4 `}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={1255}
            thumbnail={burgerBunImg}
          />
        </div>
      )}
      <BurgerIngredientsSumm
        dataLoadingStatus={props.dataLoadingStatus}
        summ={
          props.selectedIngredients.length > 0
            ? props.selectedIngredients
                .map((item_id) =>
                  props.ingredientsData.find((item) => item._id === item_id)
                )
                .reduce(
                  (prev, current) =>
                    prev +
                    (current && current.price !== undefined
                      ? current.price
                      : 0),
                  0
                )
            : 0
        }
      />
    </section>
  );
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.string.isRequired)
    .isRequired,
  ingredientsData: PropTypes.arrayOf(burgerIngredientPropTypes).isRequired,
  dataLoadingStatus: dataLoadingStatusPropType,
};

export default BurgerConstructor;
