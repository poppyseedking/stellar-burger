import { createSlice } from "@reduxjs/toolkit";

const currentIngredientSlice = createSlice({
  name: "current-ingredient",
  initialState: {
    ingredient: null,
  },
  reducers: {
    set: (state, action) => {
      state.ingredient = action.payload;
    },
    clear: (state) => {
      state.ingredient = null;
    },
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export const reducer = currentIngredientSlice.reducer;
export const { set, clear } = currentIngredientSlice.actions;
