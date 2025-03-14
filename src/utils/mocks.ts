import {
  IIngredient,
  LastOrdersData,
  TUserUpdateData,
} from "./types";

type TIngredientsData = IIngredient & { count: number };

export const ingredientsData: TIngredientsData[] = [
  {
    _id: "643d69a5c3f7b9001cfa0943",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
    count: 0,
    id: "0d8ad6e7-56e5-4272-a98e-b71acc31e2b2",
  },
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
    count: 0,
    id: "8d9be365-f065-4164-b1d0-6378160022ed",
  },
  {
    _id: "643d69a5c3f7b9001cfa094a",
    name: "Сыр с астероидной плесенью",
    type: "main",
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: "https://code.s3.yandex.net/react/code/cheese.png",
    image_mobile: "https://code.s3.yandex.net/react/code/cheese-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/cheese-large.png",
    __v: 0,
    count: 0,
    id: "32da550b-28bd-4c72-b8ec-f8743bd30314",
  },
];

export const bunData: IIngredient = {
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
};

export const userData: TUserUpdateData[] = [
  {
    name: "Георгий",
    email: "ggf@ya.ru",
    password: "12345678",
  },
  {
    name: "Кирилл",
    email: "kir@ill.ru",
    password: "12345678",
  },
];

export const lastOrders: LastOrdersData = {
  success: true,
  orders: [
    {
      _id: "661cf4ab97ede0001d065af6",
      ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0940",
        "643d69a5c3f7b9001cfa093c",
      ],
      status: "done",
      name: "Краторный био-марсианский люминесцентный метеоритный бургер",
      createdAt: "2024-04-15T09:34:35.398Z",
      updatedAt: "2024-04-15T09:34:35.874Z",
      number: 38122,
    },
    {
      _id: "661ce97297ede0001d065aeb",
      ingredients: [
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093d",
      ],
      status: "done",
      name: "Флюоресцентный люминесцентный бессмертный бургер",
      createdAt: "2024-04-15T08:46:42.935Z",
      updatedAt: "2024-04-15T08:46:43.592Z",
      number: 38121,
    },
    {
      _id: "661ccf9a97ede0001d065ac8",
      ingredients: [
        "643d69a5c3f7b9001cfa093d",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa093d",
      ],
      status: "done",
      name: "Флюоресцентный люминесцентный бургер",
      createdAt: "2024-04-15T06:56:26.838Z",
      updatedAt: "2024-04-15T06:56:27.303Z",
      number: 38120,
    },
  ],
  total: 10,
  totalToday: 5,
};
