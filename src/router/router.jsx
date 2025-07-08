import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllProperties from "../Home/AllProperties/AllProperties";

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
        path:'/properties',
        Component:AllProperties
      },

      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
]);
