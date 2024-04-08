import { BURGER_API_URL } from "./user-api";

function request(url: string, options: {}) {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

export const createOrder = (ids: string[]) => {
  return request(`${BURGER_API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ids,
    }),
  });
};
