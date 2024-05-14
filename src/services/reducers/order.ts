import { createOrder } from "../actions/order";
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null as { number: number } | null,
    loading: false,
    error: null,
  },
  reducers: {
    clear: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.order = { number: action.payload.order.number };
    });
  },
});

export const reducer = orderSlice.reducer;
export const { clear } = orderSlice.actions;
