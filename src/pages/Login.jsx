import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { handleGoogleSignIn, loading, setLoading, logIn, user, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      setLoading(true);
      const userCredential = await logIn(email, password);
      setUser(userCredential.user);
      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignInWithRedirect = async () => {
    setLoading(true);
    try {
      const userCredential = await handleGoogleSignIn();
      setUser(userCredential.user); // Update user state in AuthContext
      navigate("/");
    } catch (error) {
      setError(`Google sign-in failed: ${error.message}`);
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
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full input input-bordered input-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full input input-bordered input-primary"
              required
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
            <Link to="/auth/forgot-password" className="text-sm text-primary">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className={`w-full btn font-semibold ${
              loading ? "btn-disabled" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
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
