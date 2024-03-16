import { useDrop } from "react-dnd";
import styles from "./burger-drop-ingredient-area.module.css";

type TBugerDropIngredientArea = {
  children: React.ReactNode | React.ReactNode[];
};

const BugerDropIngredientArea = ({ children }: TBugerDropIngredientArea) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["main", "sauce"],
    drop: () => ({ type: "ingredient" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      data-testid="dustbin2"
      className={`${styles.selected_ingredients} ${
        (isActive || canDrop) && "burger-can_drop"
      } custom-scroll pt-4 pb-4 pr-2`}
    >
      {children}
    </div>
  );
};

export default BugerDropIngredientArea;
