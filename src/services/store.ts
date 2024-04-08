import { configureStore as createStore } from "@reduxjs/toolkit";
import { ingredientsApi } from "./api";
import { orderDetailApi } from "./api";
import { reducer as selectedIngredientsReducer } from "./selected-ingredients";
import { reducer as currentIngredientReducer } from "./current-ingredient";
import { reducer as orderReducer } from "./order";
import { lastOrdersReducer } from "./last-orders";
import { lastUserOrdersReducer } from "./last-user-orders";
import userReducer from "./user";

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
