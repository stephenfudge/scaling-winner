import clientPromise from "../../lib/mongodb";
import WrestlingHeader from "../components/wrestling";
import Pagination from "../components/Pagination";
import { useState } from "react";

export default function Wrestling({ wrestling }) {
    const [page, setPage] = useState(1);
    const limit = 18;
    const totalPages = Math.ceil(wrestling.length / limit);
    const currentWrestling = wrestling.slice((page - 1) * limit, page * limit);

    function handlePageChange(newPage) {
        setPage(newPage);
    }


  return (
    <div>
      <h1>Professional Wrestling DVDs and BluRays</h1>
      <WrestlingHeader />

      {/* to have the background colour present remove the first table in classname */}
     <div className="overflow-x-auto">
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
              <td></td>
              <td>{film.promotion}</td>
              <td>{film.title}</td>
              <td>{film.presentation}</td>
              <td>{film.format}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Promotion</th>
            <th>Title</th>
            <th>Presentation Style</th>
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

    const wrestling = await db
      .collection("wrestling")
      .find({})
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
