import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder as createOrderApi } from "../../utils/ingredients-api";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (payload) => {
    const response = await createOrderApi(payload);
    return response;
  }
);
