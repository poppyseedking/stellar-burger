import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-ingredients-summ.module.css";
import { useModal } from "../../hooks/use-modal";
import { useSelector, useDispatch } from "../../services/store";
import { createOrder } from "../../services/actions/order";
import { clear as clearOrder } from "../../services/reducers/order";
import { clear as clearSelectedIngredients } from "../../services/reducers/selected-ingredients";
import { Navigate } from "react-router-dom";

function BurgerIngredientsSumm({ summ }: { summ: number }) {
  const dispatch = useDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();

  const selectedIngredients = useSelector(
    (store) => store.selectedIngredients.ingredients
  );
  const selectedBun = useSelector((store) => store.selectedIngredients.bun);

  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);

  const [needAuth, setNeedAuth] = React.useState(false);

  const createNewOrder = () => {
    if (selectedBun) {
      const orderIngredients = [
        selectedBun._id,
        ...selectedIngredients.map((item) => item._id),
        selectedBun._id,
      ];

      if (!isAuthChecked || !user) {
        setNeedAuth(true);
      } else {
        dispatch(createOrder(orderIngredients));
        openModal();
      }
    }
  };

  if (needAuth) {
    return <Navigate to="/login" replace={true} />;
  }

  const modal = (
    <Modal
      onClose={() => {
        dispatch(clearOrder());
        dispatch(clearSelectedIngredients());
        closeModal();
      }}
    >
      <OrderDetails />
    </Modal>
  );

  return (
    <div
      className={`${styles.summ} d-flex justify-content-end align-items-center mr-8 mt-10`}
    >
      <span className="mr-2 text text_type_digits-medium">{summ}</span>
      <CurrencyIcon type="primary" />
      {summ > 0 && selectedBun && (
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={createNewOrder}
          data-testid="createNewOrderButton"
        >
          Оформить заказ
        </Button>
      )}
      {isModalOpen && modal}
    </div>
  );
}

export default BurgerIngredientsSumm;
