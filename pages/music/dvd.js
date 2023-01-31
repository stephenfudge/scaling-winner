import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import MusicHeader from "../components/music";
import Pagination from "../components/Pagination";

export default function MusicDvd({ music }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(music.length / limit);
  const currentMusic = music.slice((page - 1) * limit, page * limit);

  function handlePageChange(newPage) {
    setPage(newPage);
  }
  

  return (
    <div>
      <div className="flex justify-center">
      <h1 className="text-2xl px-5 py-3">Music DVDs</h1>
      <MusicHeader />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Artist</th>
              <th>Title</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {currentMusic.map((film) => (
              <tr>
                <th></th>
                <td>{film.artist}</td>
                <td>{film.title}</td>
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

    const music = await db
      .collection("music")
      .find({ format: "DVD" })
      .sort({ artist: 1, title: 1 })
      // .limit(20)
      .toArray();

    return {
      props: { music: JSON.parse(JSON.stringify(music)) },
    };
  } catch (e) {
    console.error(e);
  }
}
