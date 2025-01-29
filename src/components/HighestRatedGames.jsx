import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import GamesCard from "./GamesCard";

const HighestRatedGames = () => {
  const { games } = useContext(AuthContext);

  // Get top 6 highest-rated games
  const topGames = [...games]
    .sort((a, b) => b.rating - a.rating) // Sort by rating (highest first)
    .slice(0, 6); // Take only the top 6

  return (
    <div className="flex flex-col items-center py-8 px-4 ">
      <h2 className="text-3xl font-bold mb-2">Top 6 Highest Rated Games</h2>
      <p className="mb-6 text-center max-w-lg">
        Check out the most highly rated games that players love!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mt-5">
        {topGames.map((game) => (
          <GamesCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default HighestRatedGames;
