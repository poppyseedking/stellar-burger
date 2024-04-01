import { Middleware, MiddlewareAPI } from "redux";
import { AppActions, AppDispatch, RootState } from "../store";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AppActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === "LAST_ORDERS_WS_CONNECTING") {
        // объект класса WebSocket
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: "LAST_ORDERS_WS_OPEN" });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: "LAST_ORDERS_WS_ERROR", payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({
            type: "LAST_ORDERS_WS_MESSAGE",
            payload: JSON.parse(data),
          });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: "LAST_ORDERS_WS_CLOSE", payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
