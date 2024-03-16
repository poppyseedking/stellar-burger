import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ingredientsApiConfig } from "../utils/ingredients-api";

export const ingredientsApi = createApi({
  reducerPath: "ingredientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ingredientsApiConfig.baseUrl,
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

export const { useGetIngredientsQuery } = ingredientsApi;
