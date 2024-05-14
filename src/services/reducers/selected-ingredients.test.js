import {
  reducer,
  add,
  addBun,
  sort,
  deleteIngredient,
  clear,
} from "./selected-ingredients";
import { bunData, ingredientsData } from "../../utils/mocks";

describe("Selected Ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      ingredients: [],
      bun: null,
    });
  });

  it("should add an ingredient to the list", () => {
    expect(
      reducer(
        { ingredients: [] },
        {
          type: add.type,
          payload: ingredientsData[0],
        }
      ).ingredients
    ).toEqual([ingredientsData[0]]);
  });

  it("should sort", () => {
    expect(
      reducer(
        {
          ingredients: [
            ingredientsData[0],
            ingredientsData[1],
            ingredientsData[2],
          ],
        },
        {
          type: sort.type,
          payload: [ingredientsData[2], ingredientsData[0], ingredientsData[1]],
        }
      ).ingredients
    ).toEqual([ingredientsData[2], ingredientsData[0], ingredientsData[1]]);
  });

  it("should add bun", () => {
    expect(
      reducer(
        { bun: null },
        {
          type: addBun.type,
          payload: bunData,
        }
      ).bun
    ).toEqual(bunData);
  });

  it("should delete ingredient", () => {
    expect(
      reducer(
        {
          ingredients: [
            ingredientsData[0],
            ingredientsData[1],
            ingredientsData[2],
          ],
        },
        {
          type: deleteIngredient.type,
          payload: "8d9be365-f065-4164-b1d0-6378160022ed",
        }
      ).ingredients
    ).toEqual([ingredientsData[0], ingredientsData[2]]);
  });

  it("should delete all ingredients and bun", () => {
    expect(
      reducer(
        {
          ingredients: [
            ingredientsData[0],
            ingredientsData[1],
            ingredientsData[2],
          ],
          bun: bunData,
        },
        {
          type: clear.type,
        }
      )
    ).toEqual({ ingredients: [], bun: null });
  });
});
