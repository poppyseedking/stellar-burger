export interface IIngredient {
  id: string;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IUser {
  isAuthChecked: boolean;
  user: TUserData;
}

export type TUserData = {
  name: string;
  email: string;
};

export type TUserUpdateData = TUserData & { password: string };

export type TUserAuthData = {
  email: string;
  password: string;
};

export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export interface TableRow {
  id: number;
  text: string;
}

export type LastOrderData = {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type LastOrdersData = {
  success: boolean;
  orders: LastOrderData[];
  total: number;
  totalToday: number;
};

export type LastOrdersActions = LastOrdersData;
