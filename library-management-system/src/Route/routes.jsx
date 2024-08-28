import Signup from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import Home from "../components/Home";
import UserDashboard from "../components/Users/UserDashboard";
import AdminDashboard from "../components/Admins/AdminDashboard";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/user-dashboard", element: <UserDashboard /> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
];
