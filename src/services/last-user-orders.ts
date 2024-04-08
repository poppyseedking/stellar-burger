import { LastOrdersData, WebsocketStatus } from "../utils/types";

import { createReducer } from "@reduxjs/toolkit";

import {
  wsConnectionSuccess,
  wsConnectionClosed,
  wsGetOrders,
  wsConnectionError,
  wsConnectionStart,
} from "./actions/last-user-orders";

type TInitialState = {
  status: WebsocketStatus;
  connectionError: "";
  lastUserOrders: LastOrdersData | null;
};

export const initialState: TInitialState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  lastUserOrders: null,
};

export const lastUserOrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnectionStart, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsConnectionSuccess, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
    })
    .addCase(wsConnectionClosed, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsConnectionError, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsGetOrders, (state, action) => {
      state.status = WebsocketStatus.ONLINE;
      state.lastUserOrders = action.payload;
    });
});
