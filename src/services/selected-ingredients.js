import { createSlice } from "@reduxjs/toolkit";

const selectedIngredientsSlice = createSlice({
  name: "selected-ingredients",
  initialState: {
    ingredients: [],
    bun: null,
  },
  reducers: {
    add: (state, action) => {
      state.ingredients.push(action.payload);
    },
    sort: (state, action) => {
      state.ingredients = action.payload;
    },
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clear: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

export const reducer = selectedIngredientsSlice.reducer;
export const { add, addBun, sort, deleteIngredient, clear } =
  selectedIngredientsSlice.actions;
