import { createAction } from "@reduxjs/toolkit";
import { LastOrdersData } from "../../utils/types";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
export const WS_ORDERS_CONNECTION_START = "WS_ORDERS_CONNECTION_START";
export const WS_ORDERS_CONNECTION_SUCCESS = "WS_ORDERS_CONNECTION_SUCCESS";
export const WS_ORDERS_CONNECTION_ERROR = "WS_ORDERS_CONNECTION_ERROR";
export const WS_ORDERS_CONNECTION_CLOSED = "WS_ORDERS_CONNECTION_CLOSED";
export const WS_ORDERS_CONNECTION_CLOSE_START = "WS_ORDERS_CONNECTION_CLOSE_START";
export const WS_ORDERS_MESSAGES = "WS_ORDERS_MESSAGES";

export type ILastOrdersWsActions = {
  wsConnecting: ActionCreatorWithPayload<string>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onClosing: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithoutPayload;
  onMessage: ActionCreatorWithPayload<any>;
};

export interface IWsConnectionStart {
  readonly type: typeof WS_ORDERS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}
export interface IWsConnectionCloseStart {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSE_START;
}
export interface IWsGetOrders {
  readonly type: typeof WS_ORDERS_MESSAGES;
  readonly payload: LastOrdersData;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetOrders;

export const wsConnectionStart = createAction<
  string,
  typeof WS_ORDERS_CONNECTION_START
>(WS_ORDERS_CONNECTION_START);
export const wsConnectionSuccess = createAction(WS_ORDERS_CONNECTION_SUCCESS);
export const wsConnectionClosed = createAction(WS_ORDERS_CONNECTION_CLOSED);
export const wsConnectionCloseStart = createAction(WS_ORDERS_CONNECTION_CLOSE_START);
export const wsGetOrders = createAction<LastOrdersData, typeof WS_ORDERS_MESSAGES>(
  WS_ORDERS_MESSAGES
);
export const wsConnectionError = createAction(WS_ORDERS_CONNECTION_ERROR);

export const wsActions: ILastOrdersWsActions = {
  wsConnecting: wsConnectionStart,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onClosing: wsConnectionCloseStart,
  onError: wsConnectionError,
  onMessage: wsGetOrders,
};
