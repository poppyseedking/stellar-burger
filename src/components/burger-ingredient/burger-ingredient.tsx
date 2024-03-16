import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  add as addIngredient,
  addBun,
} from "../../services/selected-ingredients.js";
import { v4 as uuidv4 } from "uuid";

import styles from "./burger-ingredient.module.css";
import { Link, useLocation } from "react-router-dom";
import { AppDispatch } from "../../services/store.js";
import { IIngredient } from "../../utils/types.js";

type TBurgerIngredient = {
  ingredient: IIngredient;
  count: number;
};

type TDropReult = { type: "ingredient" | "bun" };

function BurgerIngredient(props: TBurgerIngredient) {
  const dispatch: AppDispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.ingredient.type,
    item: props.ingredient,
    end: (item, monitor) => {
      const dropResult: TDropReult | null = monitor.getDropResult();
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

  const location = useLocation();

  const ingredientId = props.ingredient._id;

  return (
    <Link
      key={ingredientId}
      to={`/ingredients/${props.ingredient._id}`}
      state={{ background: location }}
      className={`text-center mt-4 mb-4 ml-3 mr-3 cursor-pointer ${styles.ingredient_wrap}`}
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
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{props.ingredient.name}</p>
    </Link>
  );
}

export default BurgerIngredient;
