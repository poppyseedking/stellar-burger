import { LastOrdersData, WebsocketStatus } from "../utils/types";

import { createSlice } from "@reduxjs/toolkit";

import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "./actions/last-user-orders";

export type LastUserOrdersStore = {
  status: WebsocketStatus;
  connectionError: string;
  lastUserOrders: LastOrdersData | null;
};

const lastUserOrdersSlice = createSlice({
  name: "last-orders",
  initialState: {
    status: WebsocketStatus.OFFLINE,
    connectionError: "",
    lastUserOrders: null as LastOrdersData | null,
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
        state.lastUserOrders = action.payload;
      });
  },
});

export const reducer = lastUserOrdersSlice.reducer;
