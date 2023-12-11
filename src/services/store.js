import { configureStore as createStore } from "@reduxjs/toolkit";
import { ingredientsApi } from "./api";
import { reducer as selectedIngredientsReducer } from "./selected-ingredients";
import { reducer as currentIngredientReducer } from "./current-ingredient";
import { reducer as orderReducer } from "./order";

export const configureStore = (initialState) => {
  const store = createStore({
    reducer: {
      [ingredientsApi.reducerPath]: ingredientsApi.reducer,
      order: orderReducer,
      selectedIngredients: selectedIngredientsReducer,
      currentIngredient: currentIngredientReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(ingredientsApi.middleware);
    },
  });
  return store;
};
