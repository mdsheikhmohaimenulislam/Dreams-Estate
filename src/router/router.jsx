import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllProperties from "../Home/AllProperties/AllProperties";
import PrivateRouter from "../Context/PrivateRouter/PrivateRouter";
import DashboardRoot from "../DashboardLayOut/DashboardRoot/DashboardRoot";
import DashboardHome from "../DashboardLayOut/DashboardHome/DashboardHome";
import Profile from "../DashboardLayOut/Common/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/properties",
        Component: AllProperties,
      },

      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardRoot />
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <DashboardHome />
          </PrivateRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
