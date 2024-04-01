import { useDispatch } from "react-redux";
import AppHeader from "../components/app-header/app-header";
import FeedMonitoring from "../components/feed-monitoring/feed-monitoring";
import Orders from "../components/orders/orders";
import { AppDispatch } from "../services/store";
import { useEffect } from "react";
import { wsConnecting } from "../services/actions/last-orders";

const Feed = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnecting());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className="container pl-5 pr-5">
        <h1 className="text text_type_main-large mb-5 pt-10">Лента заказов</h1>
        <div className="main">
          <Orders />
          <FeedMonitoring />
        </div>
      </main>
    </>
  );
};

export default Feed;
