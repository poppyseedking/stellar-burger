import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import { ILastOrdersWsActions } from "../actions/last-orders";
import { ILastUserOrdersWsActions } from "../actions/last-user-orders";

export type TMiddlewareActions =
  | ILastOrdersWsActions
  | ILastUserOrdersWsActions;

export const socketMidlleware = (actions: TMiddlewareActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { wsConnecting, onOpen, onClose, onError, onMessage, onClosing } =
        actions;

      if (wsConnecting.match(action)) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
        };
        socket.onerror = () => {
          dispatch(onError());
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success } = parsedData;

          success && dispatch(onMessage(parsedData));
        };
      }
      if (socket && onClose.match(action)) {
        socket.onclose = (event) => {
          dispatch(onClose());
        };
      }
      if (socket && onClosing.match(action)) {
        if (socket.readyState !== WebSocket.CONNECTING) {
          socket.close(1000);
        }
      }
      next(action);
    };
  };
};
