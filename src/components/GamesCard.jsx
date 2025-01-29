import { useNavigate } from "react-router-dom";

const GamesCard = ({ game, isDarkMode }) => {
  const navigate = useNavigate();
  const handleExploreBtn = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div
      className={`shadow-lg hover:shadow-2xl hover:scale-105 transition rounded-2xl overflow-hidden w-80 border hover:border-green-500 flex flex-col ${
        isDarkMode ? "border-gray-700" : "border-gray-300"
      }`}
    >
      {/* Banner Image */}
      <img
        src={game.bannerImage}
        alt={`${game.title} banner`}
        className="w-full h-40 object-cover"
      />

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Game Title */}
        <h2 className="text-xl font-bold">{game.title}</h2>

        {/* Developer & Release Date */}
        <p className="text-sm">
          <span className="font-semibold">Developer:</span> {game.developer}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Release Date:</span>{" "}
          {game.releaseDate}
        </p>

        {/* Genre & Rating */}
        <p className="mt-2">
          <span className="font-semibold">Genre:</span> {game.genre}
        </p>
        <p className="text-yellow-500 font-semibold">⭐ {game.rating}</p>

        {/* Platforms */}
        <div className="mt-2 flex flex-wrap gap-1">
          {game.platforms.map((platform, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {platform}
            </span>
          ))}
        </div>

        {/* Explore Details Button (Sticks to Bottom) */}
        <div className="mt-auto pt-4">
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
            onClick={handleExploreBtn}
          >
            Explore Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesCard;
