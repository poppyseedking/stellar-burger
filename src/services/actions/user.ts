import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser, setAuthChecked } from "../reducers/user";
import { api } from "../../utils/user-api";
import { AppDispatch } from "../store";
import { TUserAuthData, TUserUpdateData } from "../../utils/types";

export const getUser = createAsyncThunk("user/get", async (_, thunkAPI) => {
  const res = await api.getUser();
  thunkAPI.dispatch(setUser(res.user));
});

export const login = createAsyncThunk(
  "user/login",
  async (payload: TUserAuthData) => {
    const res = await api.login(payload);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (payload: TUserUpdateData) => {
    const res = await api.register(payload);
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
  }
);

export const userUpdate = createAsyncThunk(
  "user/update",
  async (payload: TUserUpdateData, thunkAPI) => {
    const res = await api.update(payload);
    thunkAPI.dispatch(setUser(res.user));
  }
);

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
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
