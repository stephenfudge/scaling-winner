import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import FilmHeader from "../../components/film";
import Pagination from "../../components/Pagination";
import Table from "../../components/film-table";
import MovieModal from "../../components/modal";

export default function FilmsDvd({ dvd }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(dvd.length / limit);
  const isLastPage = page === totalPages;
  const adjustedLimit = isLastPage ? limit + 1 : limit;
  const startIndex = isLastPage ? (page - 2) * limit + 1 : (page - 1) * limit;
  const currentFilms = dvd.slice(startIndex, startIndex + adjustedLimit);
  const title = "Feature Films DVDs";

  const [selectedFilm, setSelectedFilm] = useState(null)
  const [showModal, setShowModal] = useState(false)
 
  function handlePageChange(newPage) {
    setSelectedFilm(null)
    setShowModal(false)
    setPage(newPage);
  }

  const handleTitleClick = async (movieId) => {
    try {
      const response = await fetch(`/api/films/${movieId}`);
      const data = await response.json();
      setSelectedFilm(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <FilmHeader title={title} />
      <Table currentFilms={currentFilms} onTitleClick={handleTitleClick}/>
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
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

    const films = await db
      .collection("films")
      .aggregate([
        {
          $match: { format: "DVD" },
        },
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
      props: { dvd: JSON.parse(JSON.stringify(films)) },
    };
  } catch (e) {
    console.error(e);
  }
}
