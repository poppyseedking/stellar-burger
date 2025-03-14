import { useDispatch } from "../services/store";
import FeedMonitoring from "../components/feed-monitoring/feed-monitoring";
import Orders from "../components/orders/orders";
import { useEffect } from "react";
import {
  wsConnectionCloseStart,
  wsConnectionStart,
} from "../services/actions/last-orders";
import { WS_ORDERS_URL } from "../utils/user-api";

const Feed = () => {
  const dispatch = useDispatch();

  const wsUrl: string = `${WS_ORDERS_URL}/orders/all`;

  useEffect(() => {
    dispatch(wsConnectionStart(wsUrl));

    return () => {
      dispatch(wsConnectionCloseStart());
    };
  }, [dispatch]);

  return (
    <main className="container pl-5 pr-5">
      <h1 className="text text_type_main-large mb-5 pt-10">Лента заказов</h1>
      <div className="main">
        <Orders />
        <FeedMonitoring />
      </div>
    </main>
  );
};

export default Feed;
