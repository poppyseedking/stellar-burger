import { thunk } from "redux-thunk";
import { bunData, ingredientsData } from "../../utils/mocks";
import createMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import { clear, reducer } from "./order";
import { createOrder } from "../actions/order";
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextDecoder, TextEncoder });

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
const initialState = {
  order: null,
  loading: false,
  error: null,
};

describe("Order reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should delete order info", () => {
    expect(
      reducer(
        {
          order: 556677,
        },
        {
          type: clear.type,
        }
      ).order
    ).toEqual(null);
  });

  it("should create order", async () => {
    const store = mockStore(initialState);

    fetchMock.postOnce("*", {
      order: { number: 556677 },
    });

    await store
      .dispatch(
        createOrder([
          bunData._id,
          ingredientsData[0]._id,
          ingredientsData[1]._id,
          bunData._id,
        ])
      )
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(createOrder.pending.type);
        expect(actions[1].type).toBe(createOrder.fulfilled.type);
        expect(actions[1].payload.order).toHaveProperty("number", 556677);
      });
  });
});
