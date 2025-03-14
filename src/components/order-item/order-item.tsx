import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.css";
import { IIngredient, LastOrderData } from "../../utils/types";
import { useGetIngredientsQuery } from "../../services/api";

const OrderItem = ({
  item,
  withStatus,
}: {
  item: LastOrderData;
  withStatus?: boolean;
}) => {
  const {
    isLoading: loading,
    error,
    data: ingredientsData,
  } = useGetIngredientsQuery("");

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

  if (!loading && !error) {
    sum = ingredientsData.data
      .filter((elem: IIngredient) => item.ingredients.includes(elem._id))
      .reduce(
        (val: number, item: IIngredient) =>
          val + (item.type === "bun" ? item.price * 2 : item.price),
        0
      );
  }

  const IngredientItem = ({
    ingredient,
    isLast,
  }: {
    ingredient: string;
    isLast?: boolean;
  }) => {
    let ingredientData: IIngredient | null = null;

    if (!loading && !error) {
      ingredientData = ingredientsData.data.find(
        (elem: IIngredient) => elem._id === ingredient
      );
    }

    return (
      <div className={styles.ingredient}>
        <img src={ingredientData?.image_mobile} alt={ingredientData?.name} />
        {isLast && (
          <span className="text text_type_main-default">
            +{item.ingredients.length - 5}
          </span>
        )}
      </div>
    );
  };

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

  return (
    <div className={`${styles.item} mb-5 p-7`}>
      <div className={`${styles.header} mb-5`}>
        <div className={`${styles.id} text text_type_digits-default`}>
          #{item.number}
        </div>
        <div
          className={`${styles.date} text text_type_main-default text_color_inactive`}
        >
          {formattedDate(item.createdAt)}
        </div>
      </div>
      <div className={`${styles.name} text text_type_main-medium`}>
        {item.name}
      </div>
      {withStatus && <Status status={item.status} />}
      <div className={`${styles.footer} mt-5`}>
        <div className={styles.ingredients}>
          {item.ingredients.slice(0, 6).map((ingredient, index) => (
            <IngredientItem
              key={index}
              ingredient={ingredient}
              isLast={index === 5}
            />
          ))}
        </div>
        <div className={styles.summ}>
          <span className="mr-2 text text_type_digits-default">{sum}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
