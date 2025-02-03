import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }

  return <Navigate to="/auth/signup" replace />;
};

export default PrivateRoutes;
