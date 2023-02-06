// importing things
import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import WrestlingHeader from "../../components/wrestling";
import Pagination from "../../components/Pagination";
import Table from "../../components/wrestling-table";

// wrestling dvd page
export default function WrestlingDvD({ dvd }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(dvd.length / limit);
  const currentWrestling = dvd.slice((page - 1) * limit, page * limit);

  const title = "Professional Wrestling DVDs";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <WrestlingHeader title={title} />
      <Table currentWrestling={currentWrestling} />
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
      .find({ format: "DVD" })
      .sort({ promotion: 1, title: 1 })
      .toArray();

    return {
      props: { dvd: JSON.parse(JSON.stringify(wrestling)) },
    };
  } catch (e) {
    console.error(e);
  }
}
