import { createSlice } from "@reduxjs/toolkit";
import { storage } from "@/utils/storage";

const initialState = {
  token: storage.get("token"),
  userInfo: storage.get("userInfo"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials(state, action) {
      const { token, userInfo } = action.payload;
      state.token = token;
      state.userInfo = userInfo;

      storage.set("token", token);
      storage.set("userInfo", userInfo);
    },

    logout(state) {
      state.token = null;
      state.userInfo = null;

      storage.remove("token");
      storage.remove("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
