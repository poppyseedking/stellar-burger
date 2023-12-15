import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-ingredient.module.css";
import { deleteIngredient as deleteSelectedIngredient } from "../../services/selected-ingredients";
import PropTypes from "prop-types";
import { burgerIngredientPropTypes } from "../../utils/types.js";

function BurgerConstructorIngredient({ item, id, index, moveCard }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleClose = () => {
    dispatch(deleteSelectedIngredient(item.id));
  };

  return (
    <div
      className={styles.element_container}
      key={item.id}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        key={item._id}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        extraClass="ml-2"
        handleClose={handleClose}
      />
    </div>
  );
}

BurgerConstructorIngredient.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveCard: PropTypes.func.isRequired,
  item: burgerIngredientPropTypes,
};

export default BurgerConstructorIngredient;
