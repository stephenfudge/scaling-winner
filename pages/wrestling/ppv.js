import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import WrestlingHeader from "../components/wrestling";
import Pagination from "../components/Pagination";

export default function WrestlingPpv({ wrestling }) {
    const [page,setPage] = useState(1);
    const limit = 18;
    const totalPages = Math.ceil(wrestling.length / limit);
    const currentWrestling = wrestling.slice((page - 1) * limit, page * limit);

    const title ="Professional Wrestling PPVs";

function handlePageChange(newPage){
  setPage(newPage);
}

  return (
    <div>
      <WrestlingHeader title={title}/>
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
                <th></th>
                <td>{film.promotion}</td>
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

    const wrestling = await db
      .collection("wrestling")
      .find({ presentation: "PPV" })
      .sort({})
      .toArray();

    return {
      props: { wrestling: JSON.parse(JSON.stringify(wrestling)) },
    };
  } catch (e) {
    console.error(e);
  }
}
