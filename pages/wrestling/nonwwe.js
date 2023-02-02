import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import WrestlingHeader from "../components/wrestling";
import Pagination from "../components/Pagination";
import Table from "../components/wrestling-table";

export default function NonWWE({ nonwwe }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(nonwwe.length / limit);
  const currentWrestling = nonwwe.slice((page - 1) * limit, page * limit);

  const title = "Non WWE BluRays and DVDs";

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

    const nonwwe = await db
      .collection("wrestling")
      .find({ promotion: { $ne: "WWE" } })
      .sort({ promotion: 1, title: 1 })
      .toArray();

    return {
      props: { nonwwe: JSON.parse(JSON.stringify(nonwwe)) },
    };
  } catch (e) {
    console.error(e);
  }
}
