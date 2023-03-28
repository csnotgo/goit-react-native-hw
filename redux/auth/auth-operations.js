import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { showToast } from "../../helpers/showToast";

export const authRegister = createAsyncThunk(
  "auth/register",
  async ({ email, password, login, photoURL }, thunkApi) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: login, photoURL });

      showToast("ok", `Welcome, ${user.displayName} `);
      return user;
    } catch (e) {
      showToast("err", "Something went wrong, please, check your email or password");
      console.log(e);
      return thunkApi.rejectWithValue();
    }
  }
);

export const authLogin = createAsyncThunk("auth/login", async ({ email, password }, thunkApi) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    showToast("ok", `Welcome, ${user.displayName} `);
    return user;
  } catch (e) {
    showToast("err", "Something went wrong, please, check your email or password");
    console.log(e);
    return thunkApi.rejectWithValue();
  }
});

export const authLogout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    showToast("ok", "See ya");
    return signOut(auth);
  } catch (e) {
    showToast("err", "Sorry, something went wrong, please, try later");
    console.log(e);
    return thunkApi.rejectWithValue();
  }
});
