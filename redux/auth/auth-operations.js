import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";

export const authRegister = createAsyncThunk(
  "auth/register",
  async ({ email, password, login, photoURL }, thunkApi) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: login, photoURL });

      return user;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue();
    }
  }
);

export const authLogin = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (e) {
    console.log(e);
    return thunkApi.rejectWithValue();
  }
});

export const authLogout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    return signOut(auth);
  } catch (e) {
    console.log(e);
    return thunkApi.rejectWithValue();
  }
});
