import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IIngredient } from "../utils/types";

const selectedIngredientsSlice = createSlice({
  name: "selected-ingredients",
  initialState: {
    ingredients: [] as IIngredient[],
    bun: null as IIngredient | null,
  },
  reducers: {
    add: (state, action: PayloadAction<IIngredient>) => {
      state.ingredients.push(action.payload);
    },
    sort: (state, action: PayloadAction<IIngredient[]>) => {
      state.ingredients = action.payload;
    },
    addBun: (state, action: PayloadAction<IIngredient>) => {
      state.bun = action.payload;
    },
    deleteIngredient: (state, action: PayloadAction<IIngredient["id"]>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clear: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
  },
});

export const reducer = selectedIngredientsSlice.reducer;
export const { add, addBun, sort, deleteIngredient, clear } =
  selectedIngredientsSlice.actions;
