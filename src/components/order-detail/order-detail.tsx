import { useSelector } from "../../services/store";
import styles from "./order-detail.module.css";
import { useEffect, useState } from "react";
import { IIngredient, LastOrderData } from "../../utils/types";
import { useParams } from "react-router-dom";
import { useGetIngredientsQuery, useGetOrderQuery } from "../../services/api";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetail = () => {
  const lastOrders = useSelector((state) => state.lastOrders.lastOrders);
  const lastUserOrders = useSelector(
    (state) => state.lastUserOrders.lastUserOrders
  );

  const [order, setOrder] = useState<LastOrderData | null>(null);

  const { number } = useParams();

  const {
    isLoading: loading,
    error,
    data: ingredientsData,
  } = useGetIngredientsQuery("");

  const {
    isLoading: orderDataLoading,
    error: orderDataError,
    data: orderData,
  } = useGetOrderQuery(number);

  useEffect(() => {
    let findOrder = null;

    if (lastUserOrders && lastUserOrders.orders) {
      findOrder = lastUserOrders.orders.find(
        (order) => order.number === Number(number)
      );
    }
    if (!findOrder && lastOrders && lastOrders.orders) {
      findOrder = lastOrders.orders.find(
        (order) => order.number === Number(number)
      );
    }
    if (findOrder) {
      setOrder(findOrder);
    }
    if (!findOrder && orderData) {
      setOrder(orderData.orders[0]);
    }
  }, [lastUserOrders, lastOrders, number, orderData]);

  const formattedDate = (date: string): string => {
    let date_obj = new Date(date);
    let today = new Date();

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let beforeYesterday = new Date();
    beforeYesterday.setDate(beforeYesterday.getDate() - 2);

    let full_date = "";

    if (date_obj.getDate() === today.getDate()) {
      full_date =
        "Сегодня, " +
        ("0" + date_obj.getHours()).slice(-2) +
        ":" +
        ("0" + date_obj.getMinutes()).slice(-2);
    } else if (date_obj.getDate() === yesterday.getDate()) {
      full_date =
        "Вчера, " +
        ("0" + date_obj.getHours()).slice(-2) +
        ":" +
        ("0" + date_obj.getMinutes()).slice(-2);
    } else if (date_obj.getDate() === beforeYesterday.getDate()) {
      full_date =
        "2 дня назад, " +
        ("0" + date_obj.getHours()).slice(-2) +
        ":" +
        ("0" + date_obj.getMinutes()).slice(-2);
    } else {
      full_date =
        ("0" + date_obj.getHours()).slice(-2) +
        ":" +
        ("0" + date_obj.getMinutes()).slice(-2) +
        " " +
        ("0" + date_obj.getDate()).slice(-2) +
        "." +
        ("0" + (date_obj.getMonth() + 1)).slice(-2) +
        "." +
        date_obj.getFullYear();
    }

    return full_date;
  };

  let sum = 0;

  if (!loading && !error && order) {
    sum = ingredientsData.data
      .filter((elem: IIngredient) => order.ingredients.includes(elem._id))
      .reduce(
        (val: number, item: IIngredient) =>
          val + (item.type === "bun" ? item.price * 2 : item.price),
        0
      );
  }

  const Status = ({ status }: { status: string }) => {
    let statusName = "";
    switch (status) {
      case "done":
        statusName = "Выполнен";
        break;
      case "created":
        statusName = "Создан";
        break;
      default:
        statusName = "Готовится";
    }
    return (
      <div
        className={`${
          status === "done" ? "text_color_success" : ""
        } text text_type_main-default mt-2`}
      >
        {statusName}
      </div>
    );
  };

  const IngredientItem = ({ ingredient }: { ingredient: string }) => {
    let ingredientData: IIngredient | null = null;

    if (!loading && !error) {
      ingredientData = ingredientsData.data.find(
        (elem: IIngredient) => elem._id === ingredient
      );
    }

    return (
      <>
        {order && ingredientData && (
          <div className={`${styles.ingredient} mb-4 justify-content-between`}>
            <div className="d-flex align-items-center mr-4">
              <div className={styles.ingredientImage}>
                <img
                  src={ingredientData.image_mobile}
                  alt={ingredientData.name}
                />
              </div>
              <div
                className={`${styles.ingredientName} text text_type_main-default ml-4`}
              >
                {ingredientData.name}
              </div>
            </div>
            <div
              className={`${styles.price} d-flex align-items-center text text_type_digits-default`}
            >
              {order.ingredients.reduce(
                (val: number, item: string) =>
                  val + (item === ingredientData?._id ? 1 : 0),
                0
              )}{" "}
              x <span className="mr-2">{ingredientData.price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {order && (
        <div>
          <div
            className={`${styles.number} text text_type_digits-default mb-10`}
          >
            #{order.number}
          </div>
          <div className="text-left">
            <div className={`${styles.name} text text_type_main-medium`}>
              {order.name}
            </div>
            <Status status={order.status} />
            <div className={`text text_type_main-medium mt-10 mb-5`}>
              Состав:
            </div>
            <div
              className={`${styles.ingredients} ${styles.scrollable} custom-scroll mb-10`}
            >
              {order.ingredients
                .filter(
                  (item, index) => order.ingredients.indexOf(item) === index
                )
                .map((ingredient, index) => (
                  <IngredientItem key={index} ingredient={ingredient} />
                ))}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="text text_type_main-default text_color_inactive">
                {formattedDate(order.createdAt)}
              </div>
              <div className={styles.summ}>
                <span className="mr-2 text text_type_digits-default">
                  {sum}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderDetail;
