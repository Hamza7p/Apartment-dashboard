import { RoleName } from "@/enums/RoleName";

export const selectToken = state => state.auth.token;
export const selectUserInfo = state => state.auth.userInfo;
export const selectRoleName = state =>
  state.auth.userInfo?.role ?? RoleName.user;
