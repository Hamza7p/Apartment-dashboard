import { createBrowserRouter } from "react-router";
import { Auth, Dashboard, ForgetPassword, Login, NotFound, Profile, Users } from "../pages";
import App from "../App";
import { AdminMiddleware, AuthMiddleware } from "../middlewares/Middleware.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        middleware: [AuthMiddleware, AdminMiddleware],
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    },
    {
        element: <Auth />,
        children: [
            {
                index: true,
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/forget-password",
                element: <ForgetPassword />
            }
        ]
    },
    {
        path: "/403",
        element: <h1>403 - Forbidden</h1>
    },
    {
        path: "*",
        element: <NotFound />
    }
]);