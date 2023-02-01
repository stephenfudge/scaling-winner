import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import TvHeader from "../components/tv";
import Pagination from "../components/Pagination";

export default function Tv({ tv }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(tv.length / limit);
  const currentTv = tv.slice((page - 1) * limit, page * limit);
  const title = "Television DVDs and BluRays";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <TvHeader title={title} />
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>

              <th>Season</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {currentTv.map((film) => (
              <tr>
                <th></th>
                <td>{film.title}</td>
                <td>{film.season}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

    const tv = await db
      .collection("tv")
      .find({})
      .sort({ title: 1, season: 1 })
      .toArray();

    return {
      props: { tv: JSON.parse(JSON.stringify(tv)) },
    };
  } catch (e) {
    console.error(e);
  }
}
