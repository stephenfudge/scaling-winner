import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import WrestlingHeader from "../components/wrestling";
import Pagination from "../components/Pagination";

export default function WWE({ wwe }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(wwe.length / limit);
  const currentWrestling = wwe.slice((page - 1) * limit, page * limit);

  const title = "WWE DVDs and BluRays";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <WrestlingHeader title={title} />
      <div>
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Promotion</th>
              <th>Title</th>
              <th>Presentation Style</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {currentWrestling.map((film) => (
              <tr key={film.id}>
                <th></th>
                <th>{film.promotion}</th>
                <td>{film.title}</td>
                <td>{film.presentation}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
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

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const wwe = await db
      .collection("wrestling")
      .find({ promotion: "WWE" })
      .sort({ title: 1 })
      // .limit(20)
      .toArray();

    return {
      props: { wwe: JSON.parse(JSON.stringify(wwe)) },
    };
  } catch (e) {
    console.error(e);
  }
}
