import { redirect } from "react-router";
import { RoleName } from "../enums/RoleName";

import {store} from "@/store/store"; // Ensure your redux store is exported from this path
import { selectToken, selectRoleName } from "@/store/auth/selectors"; // Adjust paths/selectors as per your project

export async function AuthMiddleware() {
    // Get latest state from redux store
    const state = store.getState();
    const token = selectToken(state);
    const isAuth = !!token;
    if (!isAuth) {
        throw redirect("/auth/login");
    }
    return null;
}

export async function AdminMiddleware() {
    // Get latest state from redux store
    const state = store.getState();
    const role = selectRoleName(state);

    if (role !== RoleName.admin) {
        throw redirect('/403');
    }
    return null;
}