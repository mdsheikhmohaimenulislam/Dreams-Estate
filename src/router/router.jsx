import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
]);
