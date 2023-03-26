import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authLogout, authRegister } from "./auth-operations";

const handlePending = (state) => {
  state.isLoading = true;
};
const handleFulfilled = (state, action) => {
  state.user.id = action.payload.uid;
  state.user.name = action.payload.displayName;
  state.user.email = action.payload.email;
};
const handleRejected = (state, action) => {
  state.error = action.payload;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { id: null, name: "", email: "", avatar: "" },
    isLoading: false,
    error: null,
  },
  reducers: {
    setCredentials(state, { payload }) {
      if (!state.user.id) state.user.id = payload.uid;
      if (!state.user.name) state.user.name = payload.displayName;
      if (!state.user.email) state.user.email = payload.email;
    },
    setUserAvatar(state, { payload }) {
      state.user.avatar = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, handlePending)
      .addCase(authRegister.fulfilled, handleFulfilled)
      .addCase(authRegister.rejected, handleRejected)
      .addCase(authLogin.pending, handlePending)
      .addCase(authLogin.fulfilled, handleFulfilled)
      .addCase(authLogin.rejected, handleRejected)
      .addCase(authLogout.pending, handlePending)
      .addCase(authLogout.fulfilled, (state) => {
        state.user.id = null;
        state.user.name = "";
        state.user.email = "";
        state.user.photo = "";
      })
      .addCase(authLogout.rejected, handleRejected);
  },
});

export const { setCredentials, setUserAvatar } = authSlice.actions;
