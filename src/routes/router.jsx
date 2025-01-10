import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import AddReview from "./../layouts/AddReview";
import AllReview from "./../layouts/AllReview";
import MyReviews from "./../layouts/MyReviews";
import UpdateReview from "./../layouts/UpdateReview";
import MyWatchList from "./../layouts/MyWatchList";

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
    element: <AddReview />,
  },
  {
    path: "reviews",
    element: <AllReview />,
  },
  {
    path: "myReviews",
    element: <MyReviews />,
  },
  {
    path: "updateReview/:id",
    element: <UpdateReview />,
  },
  {
    path: "myWatchlist",
    element: <MyWatchList />,
  },
]);

export default router;
