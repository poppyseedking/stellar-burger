import { LastOrdersData, WebsocketStatus } from "../utils/types";

import { createSlice } from "@reduxjs/toolkit";

import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "./actions/last-orders";

export type LastOrdersStore = {
  status: WebsocketStatus;
  connectionError: string;
  lastOrders: LastOrdersData | null;
};

const lastOrdersSlice = createSlice({
  name: "last-orders",
  initialState: {
    status: WebsocketStatus.OFFLINE,
    connectionError: "",
    lastOrders: null as LastOrdersData | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
        state.status = WebsocketStatus.CONNECTING;
      })
      .addCase(wsOpen, (state) => {
        state.status = WebsocketStatus.ONLINE;
        state.connectionError = "";
      })
      .addCase(wsClose, (state) => {
        state.status = WebsocketStatus.OFFLINE;
      })
      .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
      })
      .addCase(wsMessage, (state, action) => {
        state.lastOrders = action.payload;
      });
  },
});

export const reducer = lastOrdersSlice.reducer;
