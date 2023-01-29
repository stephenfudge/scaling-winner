import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import FilmHeader from "../components/film";
import Pagination from "../components/Pagination";

export default function Films({ films }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(films.length / limit);
  const currentFilms = films.slice((page - 1) * limit, page * limit);

  console.log(films.length + "total movie");
  console.log(totalPages + " total pages");

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <h1>Feature Films</h1>
      <FilmHeader />
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {currentFilms.map((film) => (
              <tr key={film.id}>
                <th></th>
                <td>{film.title}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
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
