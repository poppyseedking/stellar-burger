import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../../utils/types";

const currentIngredientSlice = createSlice({
  name: "current-ingredient",
  initialState: {
    ingredient: null as IIngredient | null,
  },
  reducers: {
    set: (state, action: PayloadAction<IIngredient>) => {
      state.ingredient = action.payload;
    },
    clear: (state) => {
      state.ingredient = null;
    },
  },
});

export const reducer = currentIngredientSlice.reducer;
export const { set, clear } = currentIngredientSlice.actions;
