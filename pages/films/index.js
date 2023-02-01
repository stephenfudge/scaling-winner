import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import FilmHeader from "../components/film";
import Pagination from "../components/Pagination";
import Table from "../components/film-table";

export default function Films({ films }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(films.length / limit);
  const currentFilms = films.slice((page - 1) * limit, page * limit);
  const title = "Feature Films BluRays and DVDs";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <FilmHeader title={title} />
      <Table currentFilms={currentFilms} />
      <div className="flex justify-center">
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const films = await db
      .collection("films")
      .find({})
      .sort({ title: 1 })
      .toArray();

    return {
      props: { films: JSON.parse(JSON.stringify(films)) },
    };
  } catch (e) {
    console.error(e);
  }
}
