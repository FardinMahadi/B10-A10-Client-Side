import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Join Us!</h2>
        <p className="text-sm text-center text-gray-400">
          Create an account to access the best gaming reviews.
        </p>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <button type="submit" className="w-full btn font-semibold">
            Sign Up
          </button>
        </form>
        <div className="divider text-gray-400">OR</div>
        <button className="w-full btn btn-outline font-semibold">
          <FaGoogle /> Continue with Google
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
