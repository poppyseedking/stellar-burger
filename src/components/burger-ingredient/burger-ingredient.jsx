import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import { burgerIngredientPropTypes } from "../../utils/types.js";

function BurgerIngredient(props) {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const modal = (
    <Modal title={"Детали ингредиента"} onClose={handleCloseModal}>
      <IngredientDetails ingredient={props.ingredient} />
    </Modal>
  );

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="text-center mt-4 mb-4 ml-3 mr-3 cursor-pointer"
      >
        <div
          className={`${styles.counter_wrap} ${props.count && styles.visible}`}
        >
          <Counter count={props.count} size="default" extraClass="m-1" />
        </div>
        <img src={props.ingredient.image} alt={props.ingredient.name} />
        <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
          <span className="text text_type_digits-default mr-2">
            {props.ingredient.price}
          </span>
          <CurrencyIcon />
        </div>
        <p className="text text_type_main-default">{props.ingredient.name}</p>
      </div>
      {modalVisible && modal}
    </>
  );
}

BurgerIngredient.propTypes = {
  count: PropTypes.number,
  ingredient: burgerIngredientPropTypes.isRequired,
};

export default BurgerIngredient;
