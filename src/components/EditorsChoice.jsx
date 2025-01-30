import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const EditorsChoice = () => {
  const { games } = useContext(AuthContext);

  return (
    <section className="container mx-auto my-12 px-10">
      <h2 className="text-3xl font-bold text-center mb-6">Editor's Choice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games
          .filter((game) => game.editorChoice)
          .map((game) => (
            <div
              key={game.id}
              className="bg-white shadow-lg rounded-lg p-6 relative"
            >
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded">
                Editor's Pick
              </span>
              <img
                src={game.gameImage}
                alt={game.title}
                className="rounded-lg mb-4"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
              />
              <h3 className="text-xl font-semibold">{game.title}</h3>
              <p className="text-gray-600 mb-3">{game.shortReview}</p>
              <a
                href={`/allReviews/${game.id}`}
                className="text-blue-500 hover:underline"
              >
                Read Full Review →
              </a>
            </div>
          ))}
      </div>
    </section>
  );
};

export default EditorsChoice;
