import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BURGER_API_URL } from "../utils/user-api";

export const ingredientsApi = createApi({
  reducerPath: "ingredientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BURGER_API_URL,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => "/api/ingredients",
      providesTags: (result) => {
        return result.data
          ? [
              ...result.data.map(({ _id }: { _id: string }) => ({
                type: "Ingredients",
                id: _id,
              })),
              { type: "Ingredients", id: "LIST" },
            ]
          : [{ type: "Ingredients", id: "LIST" }];
      },
    }),
  }),
});

export const orderDetailApi = createApi({
  reducerPath: "orderDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BURGER_API_URL,
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (id) => `/api/orders/${id}`,
      providesTags: (result) => {
        return result?.orders
          ? [
              ...result.orders.map(({ _id }: { _id: string }) => ({
                type: "OrderDetail",
                id: _id,
              })),
              { type: "OrderDetail", id: "LIST" },
            ]
          : [{ type: "OrderDetail", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetOrderQuery } = orderDetailApi;

export const { useGetIngredientsQuery } = ingredientsApi;
