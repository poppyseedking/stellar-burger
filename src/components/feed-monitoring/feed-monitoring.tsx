import { useSelector } from "react-redux";
import styles from "./feed-monitoring.module.css";
import { RootState } from "../../services/store";

const FeedMonitoring = () => {
  const lastOrders = useSelector(
    (state: RootState) => state.lastOrders.lastOrders
  );

  return (
    <section
      className={`${styles.main_section} ${styles.scrollable} custom-scroll pb-10`}
    >
      <div className="d-flex justify-content-between mb-15">
        <div className={`${styles.readyBlock} mr-10`}>
          <div className="text text_type_main-medium mb-5">Готовы:</div>
          <div className="d-flex justify-content-between">
            <div className="mr-5">
              {lastOrders?.orders
                .filter((item) => item.status === "done")
                .slice(0, 10)
                .map((order, index) => (
                  <div
                    key={index}
                    className="text_color_success text text_type_digits-default mb-3"
                  >
                    {order.number}
                  </div>
                ))}
            </div>
            <div className="mr-5">
              {lastOrders?.orders
                .filter((item) => item.status === "done")
                .slice(10, 20)
                .map((order, index) => (
                  <div
                    key={index}
                    className="text_color_success text text_type_digits-default mb-3"
                  >
                    {order.number}
                  </div>
                ))}
            </div>
            <div>
              {lastOrders?.orders
                .filter((item) => item.status === "done")
                .slice(20, 30)
                .map((order, index) => (
                  <div
                    key={index}
                    className="text_color_success text text_type_digits-default mb-3"
                  >
                    {order.number}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={`${styles.readyBlock}`}>
          <div className="text text_type_main-medium mb-5">В работе:</div>
          <div className="d-flex justify-content-between">
            <div className="mr-5">
              {lastOrders?.orders
                .filter((item) => item.status === "pending")
                .slice(0, 10)
                .map((order, index) => (
                  <div
                    key={index}
                    className="text text_type_digits-default mb-3"
                  >
                    {order.number}
                  </div>
                ))}
            </div>
            <div className="mr-5">
              {lastOrders?.orders
                .filter((item) => item.status === "pending")
                .slice(10, 20)
                .map((order, index) => (
                  <div
                    key={index}
                    className="text text_type_digits-default mb-3"
                  >
                    {order.number}
                  </div>
                ))}
            </div>
            <div>
              {lastOrders?.orders
                .filter((item) => item.status === "pending")
                .slice(10, 20)
                .map((order, index) => (
                  <div
                    key={index}
                    className="text text_type_digits-default mb-3"
                  >
                    {order.number}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text text_type_main-medium mb-5">
        Выполнено за все время:
      </div>
      <div className={`${styles.count} text text_type_digits-large mb-15`}>
        {lastOrders?.total.toLocaleString()}
      </div>
      <div className="text text_type_main-medium mb-5">
        Выполнено за сегодня
      </div>
      <div className={`${styles.count} text text_type_digits-large`}>
        {lastOrders?.totalToday.toLocaleString()}
      </div>
    </section>
  );
};
export default FeedMonitoring;
