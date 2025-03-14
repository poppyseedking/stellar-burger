import { WebsocketStatus } from "../../utils/types";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetOrders,
} from "../actions/last-user-orders";
import { lastUserOrdersReducer } from "./last-user-orders";

import { TextEncoder, TextDecoder } from "util";
import fetchMock from "fetch-mock";
import { lastOrders } from "../../utils/mocks";
Object.assign(global, { TextDecoder, TextEncoder });

describe("Last User Orders reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should return the initial state", () => {
    expect(lastUserOrdersReducer(undefined, { type: "" })).toEqual({
      status: WebsocketStatus.OFFLINE,
      connectionError: "",
      lastUserOrders: null,
    });
  });

  it("should wsConnectionStart", () => {
    expect(
      lastUserOrdersReducer(
        { status: WebsocketStatus.OFFLINE },
        {
          type: wsConnectionStart.type,
        }
      ).status
    ).toEqual(WebsocketStatus.CONNECTING);
  });

  it("should wsConnectionSuccess", () => {
    expect(
      lastUserOrdersReducer(
        { status: WebsocketStatus.CONNECTING },
        {
          type: wsConnectionSuccess.type,
        }
      ).status
    ).toEqual(WebsocketStatus.ONLINE);
  });

  it("should wsConnectionClosed", () => {
    expect(
      lastUserOrdersReducer(
        { status: WebsocketStatus.ONLINE },
        {
          type: wsConnectionClosed.type,
        }
      ).status
    ).toEqual(WebsocketStatus.OFFLINE);
  });

  it("should wsConnectionError", () => {
    expect(
      lastUserOrdersReducer(
        { status: WebsocketStatus.ONLINE },
        {
          type: wsConnectionError.type,
        }
      ).status
    ).toEqual(WebsocketStatus.OFFLINE);
  });

  it("should wsGetOrders", async () => {
    expect(
      lastUserOrdersReducer(undefined, {
        type: wsGetOrders.type,
        payload: lastOrders,
      })
    ).toEqual({
      connectionError: "",
      status: WebsocketStatus.ONLINE,
      lastUserOrders: lastOrders,
    });
  });
});
