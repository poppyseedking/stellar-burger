import { useSelector } from "../../services/store";
import OrderItem from "../order-item/order-item";
import styles from "./orders.module.css";
import { Link, useLocation } from "react-router-dom";

const Orders = () => {
  const lastOrders = useSelector((state) => state.lastOrders.lastOrders);

  const location = useLocation();
  return (
    <section
      className={`${styles.main_section} ${styles.scrollable} custom-scroll`}
    >
      {lastOrders?.orders.slice(0, 50).map((order, index) => (
        <Link
          key={index}
          to={`/feed/${order.number}`}
          state={{ background: location }}
          className="clear-link-styles"
        >
          <OrderItem item={order}></OrderItem>
        </Link>
      ))}
    </section>
  );
};
export default Orders;
