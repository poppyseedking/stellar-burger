import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-ingredients-summ.module.css";
import PropTypes from "prop-types";
import { useModal } from "../../hooks/use-modal";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../services/actions/order";
import { clear as clearOrder } from "../../services/order";
import { clear as clearSelectedIngredients } from "../../services/selected-ingredients";

function BurgerIngredientsSumm({ summ }) {
  const dispatch = useDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();

  const selectedIngredients = useSelector(
    (store) => store.selectedIngredients.ingredients
  );
  const selectedBun = useSelector((store) => store.selectedIngredients.bun);

  const createNewOrder = () => {
    const orderIngredients = [
      selectedBun._id,
      ...selectedIngredients.map((item) => item._id),
      selectedBun._id,
    ];
    dispatch(createOrder(orderIngredients));
    openModal();
  };

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
      <CurrencyIcon />
      {summ > 0 && selectedBun && (
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={createNewOrder}
        >
          Оформить заказ
        </Button>
      )}
      {isModalOpen && modal}
    </div>
  );
}

BurgerIngredientsSumm.propTypes = {
  summ: PropTypes.number.isRequired,
};

export default BurgerIngredientsSumm;
