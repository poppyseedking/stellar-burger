import { useParams } from "react-router-dom";
import { Page404 } from ".";
import OrderDetail from "../components/order-detail/order-detail";
import { useSelector } from "../services/store";
import { useEffect, useState } from "react";
import { LastOrderData } from "../utils/types";
import { useGetOrderQuery } from "../services/api";

function OrderDetailsPage() {
  const lastUserOrders = useSelector(
    (state) => state.lastUserOrders.lastUserOrders
  );

  const lastOrders = useSelector((state) => state.lastOrders.lastOrders);

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<LastOrderData | null>(null);

  const { number } = useParams();

  const {
    isLoading: orderDataLoading,
    error,
    data: orderData,
  } = useGetOrderQuery(number);

  useEffect(() => {
    let findOrder = null;

    if (lastUserOrders && lastUserOrders.orders) {
      findOrder = lastUserOrders.orders.find(
        (order) => order.number === Number(number)
      );
      setLoading(false);
    }
    if (!findOrder && lastOrders && lastOrders.orders) {
      findOrder = lastOrders.orders.find(
        (order) => order.number === Number(number)
      );
      setLoading(false);
    }
    if (findOrder) {
      setOrder(findOrder);
    }
    if (!findOrder && orderData) {
      setLoading(false);
      setOrder(orderData.orders[0]);
      setLoading(false);
    }
  }, [lastUserOrders, lastOrders, number, orderData]);

  return (
    <>
      {order && (
        <main className="main-page w-mx-640 p-5">
          <div className="text-center pt-10">
            <OrderDetail />
          </div>
        </main>
      )}
      {!order && !loading && <Page404 />}
    </>
  );
}
export { OrderDetailsPage };
