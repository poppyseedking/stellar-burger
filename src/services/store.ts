import { configureStore as createStore } from "@reduxjs/toolkit";
import { ingredientsApi } from "./api";
import { orderDetailApi } from "./api";
import { reducer as selectedIngredientsReducer } from "./selected-ingredients";
import { reducer as currentIngredientReducer } from "./current-ingredient";
import { reducer as orderReducer } from "./order";
import { reducer as lastOrdersReducer } from "./last-orders";
import { reducer as lastUserOrdersReducer } from "./last-user-orders";
import userReducer from "./user";

import { socketMiddleware } from "./middleware/socket-middleware";

import { TLastOrdersActions } from "./actions/last-orders";
import { userSocketMiddleware } from "./middleware/user-socket-middleware";
import { TLastUserOrdersActions } from "./actions/last-user-orders";

const lastOrdersMiddleware = socketMiddleware(
  "wss://norma.nomoreparties.space/orders/all"
);

const lastUserOrdersMiddleware = userSocketMiddleware(
  `wss://norma.nomoreparties.space/orders?token=${localStorage
    .getItem("accessToken")
    ?.substring("Bearer ".length)}`
);

const configureStore = () => {
  const store = createStore({
    reducer: {
      [ingredientsApi.reducerPath]: ingredientsApi.reducer,
      [orderDetailApi.reducerPath]: orderDetailApi.reducer,
      order: orderReducer,
      user: userReducer,
      selectedIngredients: selectedIngredientsReducer,
      currentIngredient: currentIngredientReducer,
      lastOrders: lastOrdersReducer,
      lastUserOrders: lastUserOrdersReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        ingredientsApi.middleware,
        orderDetailApi.middleware,
        lastOrdersMiddleware,
        lastUserOrdersMiddleware
      );
    },
  });
  return store;
};

export const store = configureStore();

export type AppActions = TLastOrdersActions | TLastUserOrdersActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
