import { createSlice } from "@reduxjs/toolkit";
import { storage } from "@/utils/storage";

const initialState = {
  mode: storage.get("mode", "light"),
  language: storage.get("language", "en"),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,

  reducers: {
    toggleMode(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      storage.set("mode", state.mode);
    },

    setLanguage(state, action) {
      state.language = action.payload;
      storage.set("language", state.language);
    },
  },
});

export const { toggleMode, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
