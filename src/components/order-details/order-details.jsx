import { orderPropType } from "../../utils/types";
import styles from "./order-details.module.css";
import imageDone from "../../images/done.png";

const OrderDetails = ({ order }) => {
  const addZeros = function (num, len = 6) {
    return ("000000" + num).slice(-len);
  };

  const formattedOrderId = addZeros(order.id);

  return (
    <div className="text-center pb-20 pt-10">
      <p className="text text_type_digits-large pb-8">{formattedOrderId}</p>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <img className={`${styles.done} mb-15`} src={imageDone} alt="Done" />
      <p className="text text_type_main-default pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  order: orderPropType,
};

export default OrderDetails;
