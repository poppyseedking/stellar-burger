import { forwardRef } from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients-group.module.css";
import { IIngredient } from "../../utils/types";

type TIngredientsData = IIngredient & { count: number };
type TProps = {
  children: React.ReactNode | React.ReactNode[];
  ingredientsData: TIngredientsData[];
  type: number;
};

type TRefProp = any;

const BurgerIngredientsGroup = forwardRef(
  (props: TProps, titleRefs: TRefProp) => {
    return (
      <>
        <h2
          ref={(element) => {
            if (titleRefs) {
              titleRefs.current[props.type] = element;
            }
          }}
          className="text text_type_main-medium"
        >
          {props.children}
        </h2>
        <div className={`${styles.ingredients} mb-10`}>
          {props.ingredientsData.map((item) => (
            <BurgerIngredient
              ingredient={item}
              key={item._id}
              count={item.count}
            />
          ))}
        </div>
      </>
    );
  }
);

export default BurgerIngredientsGroup;
