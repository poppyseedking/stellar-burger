import { useEffect } from "react";
import { useDispatch, useSelector } from "../services/store";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import OrderItem from "../components/order-item/order-item";
import { LastOrderData } from "../utils/types";
import { wsConnectionStart } from "../services/actions/last-user-orders";
import { wsConnectionCloseStart } from "../services/actions/last-orders";
import { WS_ORDERS_URL } from "../utils/user-api";

function ProfileOrders({ title }: { title: string }) {
  const dispatch = useDispatch();

  const userOrdersUrl: string = `${WS_ORDERS_URL}/orders?token=${localStorage
    .getItem("accessToken")
    ?.substring("Bearer ".length)}`;

  useEffect(() => {
    dispatch(wsConnectionStart(userOrdersUrl));

    return () => {
      dispatch(wsConnectionCloseStart());
    };
  }, [dispatch]);

  const useTitle = (title: string) => {
    const { setTitle }: { setTitle: (title: string) => void } =
      useOutletContext();

    useEffect(() => {
      setTitle(title);
    }, [setTitle, title]);
  };

  const lastUserOrders = useSelector(
    (state) => state.lastUserOrders.lastUserOrders
  );

  const reverse = (arr: LastOrderData[]) =>
    arr.map((item, index) => arr[arr.length - 1 - index]);

  const location = useLocation();

  useTitle(title);
  return (
    <>
      {lastUserOrders && lastUserOrders.orders && (
        <section className={`profile-orders-block custom-scroll`}>
          {reverse(lastUserOrders.orders).map((order, index) => (
            <Link
              key={index}
              to={`/profile/orders/${order.number}`}
              state={{ background: location }}
              className="clear-link-styles"
            >
              <OrderItem item={order} withStatus={true} />
            </Link>
          ))}
        </section>
      )}
    </>
  );
}

export default ProfileOrders;
