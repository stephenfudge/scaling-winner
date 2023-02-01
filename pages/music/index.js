import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import MusicHeader from "../components/music";
import Pagination from "../components/Pagination";
import Table from "../components/music-table";

export default function Music({ music }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(music.length / limit);
  const currentMusic = music.slice((page - 1) * limit, page * limit);
  const title = "Music BluRays and DVDs";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <MusicHeader title={title} />
      <Table currentMusic={currentMusic} />
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

    const music = await db
      .collection("music")
      .find({})
      .sort({ artist: 1, title: 1 })
      .toArray();

    return {
      props: { music: JSON.parse(JSON.stringify(music)) },
    };
  } catch (e) {
    console.error(e);
  }
}
