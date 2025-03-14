import { clear, reducer, set } from "./current-ingredient";

import { ingredientsData } from "../../utils/mocks";

describe("Current Ingredient reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      ingredient: null,
    });
  });

  it("should set current ingredient", () => {
    expect(
      reducer(
        { ingredient: null },
        {
          type: set.type,
          payload: ingredientsData[0],
        }
      ).ingredient
    ).toEqual(ingredientsData[0]);
  });

  it("should delete current ingredient", () => {
    expect(
      reducer(
        {
          ingredient: ingredientsData[0],
        },
        {
          type: clear.type,
        }
      )
    ).toEqual({ ingredient: null });
  });
});
