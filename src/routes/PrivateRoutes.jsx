import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Footer from "../components/Footer";

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
