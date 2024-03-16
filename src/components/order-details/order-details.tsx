import styles from "./order-details.module.css";
import imageDone from "../../images/done.png";
import { useSelector } from "react-redux";
import imageLoader from "../../images/infinity.svg";

type TState = {
  order: {
    order: {
      number: number;
    };
  };
};

const OrderDetails = () => {
  const order = useSelector((store: TState) => store.order.order);

  const addZeros = function (num: number, len = 6) {
    return ("000000" + num).slice(-len);
  };

  const loader = (
    <img className={`${styles.loader}`} src={imageLoader} alt="Done" />
  );

  return (
    <div className="text-center pb-20 pt-10">
      {order ? (
        <>
          <p className="text text_type_digits-large pb-8">
            {addZeros(order.number)}
          </p>

          <p className="text text_type_main-medium pb-15">
            идентификатор заказа
          </p>
          <img className={`${styles.done} mb-15`} src={imageDone} alt="Done" />
          <p className="text text_type_main-default pb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : (
        loader
      )}
    </div>
  );
};

export default OrderDetails;
