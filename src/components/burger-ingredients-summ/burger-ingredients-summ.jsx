import React from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-ingredients-summ.module.css";
import PropTypes from "prop-types";
import { dataLoadingStatusPropType } from "../../utils/types";

function BurgerIngredientsSumm(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [order, setOrder] = React.useState();

  const handleOpenModal = () => {
    createNewOrder();
  };

  const createNewOrder = () => {
    setOrder({ id: Math.floor(Math.random() * (99999 - 1000)) + 1000 });

    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const modal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails order={order} />
    </Modal>
  );

  return (
    <div
      className={`${styles.summ} d-flex justify-content-end align-items-center mr-8 mt-10`}
    >
      <span className="mr-2 text text_type_digits-medium">
        {props.dataLoadingStatus === "loaded" ? props.summ : 0}
      </span>
      <CurrencyIcon />
      {props.dataLoadingStatus === "loaded" && (
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
      )}
      {modalVisible && modal}
    </div>
  );
}

BurgerIngredientsSumm.propTypes = {
  summ: PropTypes.number,
  dataLoadingStatus: dataLoadingStatusPropType,
};

export default BurgerIngredientsSumm;
