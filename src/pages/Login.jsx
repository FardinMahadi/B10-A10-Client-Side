import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { handleGoogleSignIn, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleGoogleSignInWithRedirect = async () => {
    setLoading(true);
    try {
      await handleGoogleSignIn();
      navigate("/");
    } catch (error) {
      setError(`Google sign-in failed: ${error.code}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
        <p className="text-sm text-center">
          Log in to access the best gaming reviews.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-primary mr-2"
              />
              Remember Me
            </label>
            <a href="#" className="text-sm text-primary">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="w-full btn font-semibold">
            Log In
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
        <div className="divider text-gray-400">OR</div>
        <button
          className={`w-full btn btn-outline font-semibold ${
            loading ? "btn-disabled" : ""
          }`}
          onClick={handleGoogleSignInWithRedirect}
          disabled={loading}
        >
          <FaGoogle /> {loading ? "Signing In..." : "Continue with Google"}
        </button>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/auth/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
