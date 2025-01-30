import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Signup = () => {
  const { setUser, setLoading, handleGoogleSignIn, createNewUser, isDarkMode } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleSignInWithRedirect = async () => {
    setLoading(true);
    try {
      const userCredential = await handleGoogleSignIn();
      setUser(userCredential.user);

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: userCredential.user.displayName,
          email: userCredential.user.email,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      setError(`Google sign-in failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirm = form.confirm_password.value.trim();

    if (!name || !email || !password || !confirm) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createNewUser(email, password);
      setUser(userCredential.user);

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: name,
          email,
          photoURL: null,
          lastLogin: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to save user to the database.");
      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen py-10 transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-lg transition-all duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold text-center">Join Us!</h2>
        <p className="text-sm text-center">
          Create an account to access the best gaming reviews.
        </p>
        {error && (
          <div className="mt-4 text-sm text-red-500 text-center">{error}</div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="name"
              placeholder="Choose a username"
              className={`w-full input input-bordered ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`w-full input input-bordered ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className={`w-full input input-bordered ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm your password"
              className={`w-full input input-bordered ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full btn font-semibold transition-all duration-300 ${
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
          >
            Sign Up
          </button>
        </form>
        <div className="divider">OR</div>
        <button
          className={`w-full btn btn-outline font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
            isDarkMode
              ? "border-white text-white hover:bg-white hover:text-gray-900"
              : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
          }`}
          onClick={handleGoogleSignInWithRedirect}
        >
          <FaGoogle /> Continue with Google
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className={`font-semibold ${
              isDarkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
