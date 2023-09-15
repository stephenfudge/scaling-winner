import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import FilmHeader from "../../components/film";
import Pagination from "../../components/Pagination";
import Table from "../../components/film-table";
import MovieModal from "../../components/modal";

export default function Films({ films }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(films.length / limit);
  const currentFilms = films.slice((page - 1) * limit, page * limit);
  const title = "Feature Films BluRays and DVDs";

  const [selectedFilm, setSelectedFilm] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handlePageChange(newPage) {
    setSelectedFilm(null);
    setShowModal(false);
    setPage(newPage);
  }

  const handleTitleClick = async (movieId) => {
    try {
      const response = await fetch(`/api/films/${movieId}`);
      const data = await response.json();
      console.log(data);
      setSelectedFilm(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <FilmHeader title={title} />
      <Table currentFilms={currentFilms} onTitleClick={handleTitleClick} />
      <div className="flex justify-center">
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      {showModal && (
        <MovieModal movieDetails={selectedFilm} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    // ignores the word The when it's the first word in the movie title
    const films = await db
      .collection("films")
      .aggregate([
        {
          $addFields: {
            titleWithoutThe: {
              $cond: [
                { $eq: [{ $substr: ["$title", 0, 3] }, "The"] },
                { $substr: ["$title", 4, -1] },
                "$title",
              ],
            },
          },
        },
        {
          $sort: { titleWithoutThe: 1 },
        },
        {
          $project: {
            titleWithoutThe: 0,
          },
        },
      ])
      .toArray();

    return {
      props: { films: JSON.parse(JSON.stringify(films)) },
    };
  } catch (e) {
    console.error(e);
  }
}
