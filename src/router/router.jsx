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
import PropertyBought from "../DashboardLayOut/User/PropertyBought/PropertyBought";
import PaymentPage from "../DashboardLayOut/User/PropertyBought/PaymentPage";
import MyReviews from "../DashboardLayOut/User/MyReviews";
import MySoldProperties from "../DashboardLayOut/Agent/MySoldProperties";
import RequestedProperties from "../DashboardLayOut/Agent/RequestedProperties";
import ManageProperties from "../DashboardLayOut/Admin/ManageProperties/ManageProperties";
import ManageUsers from "../DashboardLayOut/Admin/ManageProperties/ManageUser/ManageUsers";
import AdminPrivateRouter from "../Context/AdminPrivateRouter";
import ManageReviews from "../DashboardLayOut/Admin/ManageReviews";
import UserPrivateRouter from "../Context/UserPrivateRouter";
import AgentPrivateRouter from "../Context/AgentPrivateRouter";

export const router = createBrowserRouter([
  {
    errorElement: <Error />,
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/properties",
        element: <AllProperties />,
      },

      {
        path: "/DetailsPage/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/properties/${params.id}`),
        element: (
          <PrivateRouter>
            <DetailsPage />
          </PrivateRouter>
        ),
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
            <AgentPrivateRouter>
              <AddProperty />
            </AgentPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "myAddProperty",
        element: (
          <PrivateRouter>
            <AgentPrivateRouter>
              <MyAddProperties />
            </AgentPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "updateProperty",
        //   loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/properties/${params.id}`),
        element: (
          <PrivateRouter>
            <AgentPrivateRouter>
              <UpdateMyProperties />
            </AgentPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "soldProperties",
        element: (
          <PrivateRouter>
            <AgentPrivateRouter>
              <MySoldProperties />
            </AgentPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "Requested",
        element: (
          <PrivateRouter>
            <AgentPrivateRouter>
              <RequestedProperties />
            </AgentPrivateRouter>
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
        path: "wishlist",
        element: (
          <PrivateRouter>
            <UserPrivateRouter>
              <UserWishlist />
            </UserPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "offerPage",
        element: (
          <PrivateRouter>
            <UserPrivateRouter>
              <OfferPage />
            </UserPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "propertyBought",
        element: (
          <PrivateRouter>
            <UserPrivateRouter>
              <PropertyBought />
            </UserPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "paymentPage",
        element: (
          <PrivateRouter>
            <UserPrivateRouter>
              <PaymentPage />
            </UserPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "myReviews",
        element: (
          <PrivateRouter>
            <UserPrivateRouter>
              <MyReviews />
            </UserPrivateRouter>
          </PrivateRouter>
        ),
      },
      // Admin section
      {
        path: "manageProperties",
        element: (
          <PrivateRouter>
            <AdminPrivateRouter>
              <ManageProperties />
            </AdminPrivateRouter>
          </PrivateRouter>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRouter>
            <AdminPrivateRouter>
              <ManageUsers />
            </AdminPrivateRouter>
          </PrivateRouter>
        ),
      },

      {
        path: "manageReviews",
        element: (
          <PrivateRouter>
            <AdminPrivateRouter>
              <ManageReviews />
            </AdminPrivateRouter>
          </PrivateRouter>
        ),
      },
    ],
  },
]);
