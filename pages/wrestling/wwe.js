import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import WrestlingHeader from "../components/wrestling";
import Pagination from "../components/Pagination";
import Table from "../components/wrestling-table";

export default function WWE({ wwe }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(wwe.length / limit);
  const currentWrestling = wwe.slice((page - 1) * limit, page * limit);

  const title = "WWE BluRays and DVDs";

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

    const wwe = await db
      .collection("wrestling")
      .find({ promotion: "WWE" })
      .sort({ title: 1 })
      .toArray();

    return {
      props: { wwe: JSON.parse(JSON.stringify(wwe)) },
    };
  } catch (e) {
    console.error(e);
  }
}
