import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import AddReview from "./../layouts/AddReview";
import AllReview from "./../layouts/AllReview";
import MyReviews from "./../layouts/MyReviews";
import UpdateReview from "./../layouts/UpdateReview";
import MyWatchList from "./../layouts/MyWatchList";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "allReviews",
    element: <AllReview />,
  },
  {
    path: "addReview",
    element: (
      <PrivateRoutes>
        <AddReview />
      </PrivateRoutes>
    ),
  },
  {
    path: "myReviews",
    element: (
      <PrivateRoutes>
        <MyReviews />
      </PrivateRoutes>
    ),
  },
  {
    path: "myWatchlist",
    element: (
      <PrivateRoutes>
        <MyWatchList />
      </PrivateRoutes>
    ),
  },
  {
    path: "updateReview/:id",
    element: (
      <PrivateRoutes>
        <UpdateReview />
      </PrivateRoutes>
    ),
  },
]);

export default router;
