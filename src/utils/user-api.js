export const BURGER_API_URL = "https://norma.nomoreparties.space";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

function request(url, options) {
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  });
}

const getUser = () =>
  fetchWithRefresh(`${BURGER_API_URL}/api/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });

const update = (params) =>
  fetchWithRefresh(`${BURGER_API_URL}/api/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(params),
  });

const forgotPassword = (params) =>
  request(`${BURGER_API_URL}/api/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  });

const resetPassword = (params) =>
  request(`${BURGER_API_URL}/api/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  });

const login = (params) =>
  fetchWithRefresh(`${BURGER_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  });

const register = (params) =>
  fetchWithRefresh(`${BURGER_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  });

const logout = () =>
  request(`${BURGER_API_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });

export const api = {
  getUser,
  login,
  register,
  logout,
  update,
  forgotPassword,
  resetPassword,
};
