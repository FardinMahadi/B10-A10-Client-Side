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
import GameDetails from "../pages/GameDetails";
import MainLayout from "../layouts/MainLayout";
import AllGames from "../components/AllGames";

const gameLoader = async ({ params }) => {
  try {
    const response = await fetch("/games.json");
    const games = await response.json();

    const game = games.find((game) => game.id === parseInt(params.id));

    if (!game) {
      throw new Error("Game not found");
    }

    return { game };
  } catch (error) {
    throw new Error("Failed to load game data");
  }
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },

      {
        path: "allReviews",
        element: <AllReview />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/addReview",
        element: <AddReview />,
        children: [
          {
            path: "/addReview",
            element: <AllGames />,
          },
          {
            path: "game/:id",
            element: <GameDetails />,
            loader: gameLoader,
          },
        ],
      },
      {
        path: "/myReviews",
        element: <MyReviews />,
      },
      {
        path: "/myWatchlist",
        element: <MyWatchList />,
      },
      {
        path: "/updateReview/:id",
        element: <UpdateReview />,
      },
    ],
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
]);

export default router;
