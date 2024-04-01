import { LastOrdersActions } from "../../utils/types";
import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string, "LAST_ORDERS_CONNECT">(
  "LAST_ORDERS_CONNECT"
);
export const disconnect = createAction("LAST_ORDERS_DISCONNECT");
export const wsConnecting = createAction("LAST_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("LAST_ORDERS_WS_OPEN");
export const wsClose = createAction("LAST_ORDERS_WS_CLOSE");
export const wsMessage = createAction<
  LastOrdersActions,
  "LAST_ORDERS_WS_MESSAGE"
>("LAST_ORDERS_WS_MESSAGE");
export const wsError = createAction<string, "LAST_ORDERS_WS_ERROR">(
  "LAST_ORDERS_WS_ERROR"
);

export type TLastOrdersActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
