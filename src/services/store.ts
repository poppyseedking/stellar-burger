import { configureStore as createStore } from "@reduxjs/toolkit";
import { ingredientsApi } from "./api";
import { orderDetailApi } from "./api";
import { reducer as selectedIngredientsReducer } from "./reducers/selected-ingredients";
import { reducer as currentIngredientReducer } from "./reducers/current-ingredient";
import { reducer as orderReducer } from "./reducers/order";
import { lastOrdersReducer } from "./reducers/last-orders";
import { lastUserOrdersReducer } from "./reducers/last-user-orders";
import userReducer from "./reducers/user";

import {
  TMiddlewareActions,
  socketMidlleware,
} from "./middleware/socket-middleware";

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { wsActions } from "./actions/last-orders";
import { userWsActions } from "./actions/last-user-orders";

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

        socketMidlleware(wsActions),
        socketMidlleware(userWsActions)
      );
    },
  });
  return store;
};

export const store = configureStore();

export type AppActions = TMiddlewareActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
