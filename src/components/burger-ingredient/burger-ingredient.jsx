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
import { useModal } from "../../hooks/use-modal";

function BurgerIngredient(props) {
  const { isModalOpen, openModal, closeModal } = useModal();

  const modal = (
    <Modal title={"Детали ингредиента"} onClose={closeModal}>
      <IngredientDetails ingredient={props.ingredient} />
    </Modal>
  );

  return (
    <>
      <div
        onClick={openModal}
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
      {isModalOpen && modal}
    </>
  );
}

BurgerIngredient.propTypes = {
  count: PropTypes.number,
  ingredient: burgerIngredientPropTypes.isRequired,
};

export default BurgerIngredient;
