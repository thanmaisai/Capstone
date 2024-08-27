import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/user-dashboard", element: <UserDashboard /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
];
