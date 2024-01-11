import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, setAuthChecked } from "../user";
import { api } from "../../utils/user-api";

export const getUser = () => {
  return (dispatch) => {
    return api.getUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const login = createAsyncThunk("user/login", async (payload) => {
  const res = await api.login(payload);
  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  return res.user;
});

export const register = createAsyncThunk("user/register", async (payload) => {
  const res = await api.register(payload);
  localStorage.setItem("accessToken", res.accessToken);
  localStorage.setItem("refreshToken", res.refreshToken);
  return res.user;
});

export const userUpdate = (params) => {
  return (dispatch) => {
    return api.update(params).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const logout = createAsyncThunk("user/logout", async () => {
  await api.logout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});
