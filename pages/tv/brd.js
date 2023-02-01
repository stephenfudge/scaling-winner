import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import TvHeader from "../components/tv";
import Pagination from "../components/Pagination";
import Table from "../components/tv-table";

export default function TvBrd({ brd }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(brd.length / limit);
  const currentTv = brd.slice((page - 1) * limit, page * limit);

  const title = "TV BluRays";
  const message = "Currently I do not own any TV shows on BluRay";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <TvHeader title={title} />
      <Table currentTv={currentTv} message={message} />
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

    const tv = await db
      .collection("tv")
      .find({ format: "BRD" })
      .sort({ title: 1, season: 1 })
      .toArray();

    return {
      props: { brd: JSON.parse(JSON.stringify(tv)) },
    };
  } catch (e) {
    console.error(e);
  }
}
