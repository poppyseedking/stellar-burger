export const ingredientsApiConfig = {
  baseUrl: "https://norma.nomoreparties.space",
};

function request(url, options) {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

export const createOrder = (ids) => {
  return request(`${ingredientsApiConfig.baseUrl}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: ids,
    }),
  });
};
