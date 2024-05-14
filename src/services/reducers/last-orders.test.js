import { WebsocketStatus } from "../../utils/types";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetOrders,
} from "../actions/last-orders";
import { lastOrdersReducer } from "./last-orders";

import { TextEncoder, TextDecoder } from "util";
import fetchMock from "fetch-mock";
import { lastOrders } from "../../utils/mocks";
Object.assign(global, { TextDecoder, TextEncoder });

describe("Last Orders reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should return the initial state", () => {
    expect(lastOrdersReducer(undefined, { type: "" })).toEqual({
      status: WebsocketStatus.OFFLINE,
      connectionError: "",
      lastOrders: null,
    });
  });

  it("should wsConnectionStart", () => {
    expect(
      lastOrdersReducer(
        { status: WebsocketStatus.OFFLINE },
        {
          type: wsConnectionStart.type,
        }
      ).status
    ).toEqual(WebsocketStatus.CONNECTING);
  });

  it("should wsConnectionSuccess", () => {
    expect(
      lastOrdersReducer(
        { status: WebsocketStatus.CONNECTING },
        {
          type: wsConnectionSuccess.type,
        }
      ).status
    ).toEqual(WebsocketStatus.ONLINE);
  });

  it("should wsConnectionClosed", () => {
    expect(
      lastOrdersReducer(
        { status: WebsocketStatus.ONLINE },
        {
          type: wsConnectionClosed.type,
        }
      ).status
    ).toEqual(WebsocketStatus.OFFLINE);
  });

  it("should wsConnectionError", () => {
    expect(
      lastOrdersReducer(
        { status: WebsocketStatus.ONLINE },
        {
          type: wsConnectionError.type,
        }
      ).status
    ).toEqual(WebsocketStatus.OFFLINE);
  });

  it("should wsGetOrders", async () => {
    expect(
      lastOrdersReducer(undefined, {
        type: wsGetOrders.type,
        payload: lastOrders,
      })
    ).toEqual({
      connectionError: "",
      status: WebsocketStatus.ONLINE,
      lastOrders: lastOrders,
    });
  });
});
