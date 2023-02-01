import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import WrestlingHeader from "../components/wrestling";
import Pagination from "../components/Pagination";

export default function WrestlingBrd({ wrestling }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(wrestling.length / limit);
  const currentWrestling = wrestling.slice((page - 1) * limit, page * limit);

  const title = "Professional Wrestling BluRays";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <WrestlingHeader title={title} />
      {/* <ul>
                {wrestling.map((film) => (
                    <li>
                        <h2>{film.promotion}</h2>
                        <h2>{film.title}</h2>
                        <h2>{film.presentation}</h2>
                        <h3>{film.format}</h3>
                    </li>
                ))}
            </ul> */}
      {/* <div className="overflow-x-auto"> */}
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
          {wrestling.map((film) => (
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
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
    // </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const wrestling = await db
      .collection("wrestling")
      .find({ format: "BRD" })
      .sort({ promotion: 1, title: 1 })
      // .limit(20)
      .toArray();

    return {
      props: { wrestling: JSON.parse(JSON.stringify(wrestling)) },
    };
  } catch (e) {
    console.error(e);
  }
}
