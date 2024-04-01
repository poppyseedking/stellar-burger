import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./actions/user";
import { TUserData } from "../utils/types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as TUserData | null,
    isAuthChecked: false,
    isForgotSend: false,
  },
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUserData | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<TUserData | null>) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        }
      )
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<TUserData | null>) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;
