import { configureStore as createStore } from "@reduxjs/toolkit";
import { ingredientsApi } from "./api";
import { reducer as selectedIngredientsReducer } from "./selected-ingredients";
import { reducer as currentIngredientReducer } from "./current-ingredient";
import { reducer as orderReducer } from "./order";
import userReducer from "./user";

const configureStore = () => {
  const store = createStore({
    reducer: {
      [ingredientsApi.reducerPath]: ingredientsApi.reducer,
      order: orderReducer,
      user: userReducer,
      selectedIngredients: selectedIngredientsReducer,
      currentIngredient: currentIngredientReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(ingredientsApi.middleware);
    },
  });
  return store;
};

export const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
