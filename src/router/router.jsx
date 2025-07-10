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
import AddProperty from "../DashboardLayOut/Agent/AddProperty";
import MyAddProperties from "../DashboardLayOut/Agent/MyAddProperties/MyAddProperties";
import UpdateMyProperties from "../DashboardLayOut/Agent/MyAddProperties/UpdateMyProperties";
import DetailsPage from "../Home/AllProperties/DetailsPage";
import Error from "../Home/Error/Error";
import Wishlist from "../Home/AllProperties/Review/Wishlist";
import UserWishlist from "../DashboardLayOut/User/Wishlist/UserWishlist";
import OfferPage from "../DashboardLayOut/User/Wishlist/OfferPage/OfferPage";

export const router = createBrowserRouter([
  {
    errorElement:<Error/>,
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/properties",
       element:<PrivateRouter>
        <AllProperties/>
       </PrivateRouter>
      },

      {
        path: "/DetailsPage/:id",
         loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/properties/${params.id}`),
       element:<PrivateRouter>
        <DetailsPage/>
       </PrivateRouter>
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
    //   Agent section
      {
        path: "addProperty",
        element: (
          <PrivateRouter>
            <AddProperty />
          </PrivateRouter>
        ),
      },
      {
        path: "myAddProperty",
        element: (
          <PrivateRouter>
            <MyAddProperties />
          </PrivateRouter>
        ),
      },
      {
        path: "updateProperty",
        //   loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/properties/${params.id}`),
        element: (
          <PrivateRouter>
            <UpdateMyProperties />
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

    //   user section

    {
        path:"wishlist",
        element:<PrivateRouter>
            <UserWishlist/>
        </PrivateRouter>
    },
    {
        path:"offerPage",
        element:<PrivateRouter>
            <OfferPage/>
        </PrivateRouter>
    },

    ],
  },
]);
