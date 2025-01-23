import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Signup = () => {
  const { user, setUser, setLoading, handleGoogleSignIn, createNewUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleSignInWithRedirect = async () => {
    setLoading(true);
    try {
      const userCredential = await handleGoogleSignIn();

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userCredential.user }),
      });

      setUser(userCredential.user);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("User saved successfully:", data);
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

      if (userCredential.user && userCredential.user.updateProfile) {
        await userCredential.user.updateProfile({
          displayName: name,
        });
      }

      setUser(userCredential.user);

      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: name,
          email,
          photoURL: null,
          lastLogin: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save user to the database.");
      }

      const data = await response.json();
      console.log("User saved successfully:", data);

      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Join Us!</h2>
        <p className="text-sm text-center">
          Create an account to access the best gaming reviews.
        </p>
        {error && (
          <div className="mt-4 text-sm text-red-600 text-center">{error}</div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              name="name"
              placeholder="Choose a username"
              className="w-full input input-bordered input-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full input input-bordered input-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full input input-bordered input-primary"
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
              className="w-full input input-bordered input-primary"
              required
            />
          </div>
          <button type="submit" className="w-full btn font-semibold">
            Sign Up
          </button>
        </form>
        <div className="divider">OR</div>
        <button
          className="w-full btn btn-outline font-semibold flex items-center justify-center gap-2"
          onClick={handleGoogleSignInWithRedirect}
        >
          <FaGoogle /> Continue with Google
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
