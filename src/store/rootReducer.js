import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth/authSlice";
import ui from "./ui/uiSlice";
import notifications from "./notifications/notificationSlice";

export const rootReducer = combineReducers({
  auth,
  ui,
  notifications,
});
