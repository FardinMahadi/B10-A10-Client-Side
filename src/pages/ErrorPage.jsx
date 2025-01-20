import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl mt-4">Page Not Found</h2>
        <p className="mt-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 btn btn-primary text-white font-semibold"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
