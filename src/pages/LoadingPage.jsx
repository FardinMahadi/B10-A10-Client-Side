import PacmanLoader from "react-spinners/PacmanLoader";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <PacmanLoader color="#10B981" size={30} />
    </div>
  );
};

export default LoadingPage;
