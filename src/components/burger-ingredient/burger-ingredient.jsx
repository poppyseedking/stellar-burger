import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { burgerIngredientPropTypes } from "../../utils/types.js";
import { useModal } from "../../hooks/use-modal";
import {
  add as addIngredient,
  addBun,
} from "../../services/selected-ingredients";
import { v4 as uuidv4 } from "uuid";
import {
  set as setCurrentIngredient,
  clear as clearCurrentIngredient,
} from "../../services/current-ingredient";
import styles from "./burger-ingredient.module.css";

function BurgerIngredient(props) {
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.ingredient.type,
    item: props.ingredient,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (dropResult.type === "ingredient") {
          dispatch(addIngredient({ ...props.ingredient, id: uuidv4() }));
        } else if (dropResult.type === "bun") {
          dispatch(addBun(props.ingredient));
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const { isModalOpen, openModal, closeModal } = useModal();

  const ingredientInfo = () => {
    dispatch(setCurrentIngredient(props.ingredient));
    openModal();
  };

  const modal = (
    <Modal
      title={"Детали ингредиента"}
      onClose={() => {
        dispatch(clearCurrentIngredient());
        closeModal();
      }}
    >
      <IngredientDetails />
    </Modal>
  );

  const currentIngredient = useSelector(
    (store) => store.currentIngredient.ingredient
  );

  return (
    <>
      <div
        onClick={ingredientInfo}
        className="text-center mt-4 mb-4 ml-3 mr-3 cursor-pointer"
        ref={drag}
      >
        <div
          className={`${styles.counter_wrap} ${props.count && styles.visible}`}
        >
          <Counter count={props.count} size="default" extraClass="m-1" />
        </div>
        <img
          src={props.ingredient.image}
          alt={props.ingredient.name}
          draggable={false}
        />
        <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
          <span className="text text_type_digits-default mr-2">
            {props.ingredient.price}
          </span>
          <CurrencyIcon />
        </div>
        <p className="text text_type_main-default">{props.ingredient.name}</p>
      </div>
      {currentIngredient &&
        currentIngredient._id === props.ingredient._id &&
        modal}
    </>
  );
}

BurgerIngredient.propTypes = {
  count: PropTypes.number,
  ingredient: burgerIngredientPropTypes,
};

export default BurgerIngredient;
