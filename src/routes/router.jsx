import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import AddReview from "./../layouts/AddReview";
import AllReview from "./../layouts/AllReview";
import MyReviews from "./../layouts/MyReviews";
import UpdateReview from "./../layouts/UpdateReview";
import MyWatchList from "./../layouts/MyWatchList";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
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
    path: "reviews",
    element: <AllReview />,
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
    path: "updateReview/:id",
    element: (
      <PrivateRoutes>
        <UpdateReview />
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
]);

export default router;
