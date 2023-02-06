import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import TvHeader from "../../components/tv";
import Pagination from "../../components/Pagination";
import Table from "../../components/tv-table";

export default function TvDvd({ dvd }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(dvd.length / limit);
  const currentTv = dvd.slice((page - 1) * limit, page * limit);

  const title = "TV DVDs";
  const message = "Currently I do not own any TV shows on DVD";

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
      .find({ format: "DVD" })
      .sort({ title: 1, season: 1 })
      .toArray();

    return {
      props: { dvd: JSON.parse(JSON.stringify(tv)) },
    };
  } catch (e) {
    console.error(e);
  }
}
