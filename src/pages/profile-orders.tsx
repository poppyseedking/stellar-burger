import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { AppDispatch, RootState } from "../services/store";
import OrderItem from "../components/order-item/order-item";
import { LastOrderData } from "../utils/types";
import { wsConnecting as wsConnectingUser } from "../services/actions/last-user-orders";

function ProfileOrders({ title }: { title: string }) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectingUser());
  }, [dispatch]);

  const useTitle = (title: string) => {
    const { setTitle }: { setTitle: (title: string) => void } =
      useOutletContext();

    useEffect(() => {
      setTitle(title);
    }, [setTitle, title]);
  };

  const lastUserOrders = useSelector(
    (state: RootState) => state.lastUserOrders.lastUserOrders
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
