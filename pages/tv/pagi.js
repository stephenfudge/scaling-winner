import clientPromise from "../../lib/mongodb";
import TvHeader from "../components/tv";
import { useState } from "react";
import Pagination from "../components/Pagination";

export default function TvPagination({ tv }) {
  const [page, setPage] = useState(1);
  const limit = 15;
  const totalPages = Math.ceil(tv.length / limit);
  const currentTv = tv.slice((page - 1) * limit, page * limit);

  console.log(tv.length + "total tv");
  console.log(totalPages + " total pages");

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <h1>Television DVDs and BluRays</h1>
      <TvHeader />

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
              <tr key={film._id}>
                <th></th>
                <td>{film.title}</td>
                <td>{film.season}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Season</th>
              <th>Media Format</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const page = context.query.page || 1;
    //  const limit = 10; // changed limit to 10
    //   const skip = (page - 1) * limit;

    const tv = await db
      .collection("tv")
      .find({})
      .sort({ title: 1, season: 1 })
      // .skip(skip)
      // .limit(limit)
      .toArray();

    return {
      props: { tv: JSON.parse(JSON.stringify(tv)) },
    };
  } catch (e) {
    console.error(e);
  }
}
