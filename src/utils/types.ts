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
