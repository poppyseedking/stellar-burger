export const ingredientsApiConfig = {
  baseUrl: "https://norma.nomoreparties.space",
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

export const createOrder = (ids) => {
  return fetch(`${ingredientsApiConfig.baseUrl}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: ids,
    }),
  }).then(getResponse);
};
