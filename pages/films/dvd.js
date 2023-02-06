import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import FilmHeader from "../../components/film";
import Pagination from "../../components/Pagination";
import Table from "../../components/film-table";

export default function FilmsDvd({ dvd }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(dvd.length / limit);
  const currentFilms = dvd.slice((page - 1) * limit, page * limit);
  const title = "Feature Films DVDs";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <FilmHeader title={title} />
      <Table currentFilms={currentFilms} />
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const films = await db
      .collection("films")
      .find({ format: "DVD" })
      .sort({ title: 1 })
      .toArray();

    return {
      props: { dvd: JSON.parse(JSON.stringify(films)) },
    };
  } catch (e) {
    console.error(e);
  }
}
