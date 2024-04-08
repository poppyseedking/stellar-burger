import { LastOrdersData, WebsocketStatus } from "../utils/types";

import { createReducer } from "@reduxjs/toolkit";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionStart,
  wsConnectionSuccess,
  wsGetOrders,
} from "./actions/last-orders";

type TInitialState = {
  status: WebsocketStatus;
  connectionError: "";
  lastOrders: LastOrdersData | null;
};

export const initialState: TInitialState = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  lastOrders: null,
};

export const lastOrdersReducer = createReducer(initialState, (builder) => {
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
      state.lastOrders = action.payload;
    });
});
