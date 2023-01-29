import { useState } from "react";
import clientPromise from "../../lib/mongodb";
import MusicHeader from "../components/music";

export default function Music({ music }) {
  const [page, setPage] = useState(1);
  const limit = 10; // changed limit to 10
  const totalPages = Math.ceil(music.length / limit);
  const currentMusic = music.slice((page - 1) * limit, page * limit);

  console.log(music.length + "total movie")
  console.log(totalPages + " total pages")

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <h1>Music DVDs and BluRays</h1>
      <MusicHeader />

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead className="text-secondary">
            <tr>
              <th></th>
              <th>Artist</th>
              <th>Title</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {currentMusic.map((film) => (
              <tr key={film._id}>
                <th></th>
                <td>{film.artist}</td>
                <td>{film.title}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Artist</th>
              <th>Title</th>
              <th>Media Format</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="pagination">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span>{page} of {totalPages}</span>
        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
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
  
      const music = await db
        .collection("music")
        .find({})
        .sort({ artist: 1, title: 1 })
        // .skip(skip)
        // .limit(limit)
        .toArray();
  
      return {
        props: { music: JSON.parse(JSON.stringify(music)) },
      };
    } catch (e) {
      console.error(e);
    }
  }
