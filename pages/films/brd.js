import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import FilmHeader from "../../components/film";
import Pagination from "../../components/Pagination";
import Table from "../../components/film-table";

export default function FilmsBrd({ brd }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(brd.length / limit);
  const currentFilms = brd.slice((page - 1) * limit, page * limit);
  const title = "Feature Films BluRays";

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  return (
    <div>
      <FilmHeader title={title} />
      <Table currentFilms={currentFilms} />
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

    const films = await db
      .collection("films")
      .aggregate([
        {
          $match: { format: "BRD" },
        },
        {
          $addFields: {
            titleWithoutThe: {
              $cond: [
                { $eq: [{ $substr: ["$title", 0, 3] }, "The"] },
                { $substr: ["$title", 4, -1] },
                "$title",
              ],
            },
          },
        },
        {
          $sort: { titleWithoutThe: 1 },
        },
        {
          $project: {
            titleWithoutThe: 0,
          },
        },
      ])
      .toArray();

    return {
      props: { brd: JSON.parse(JSON.stringify(films)) },
    };
  } catch (e) {
    console.error(e);
  }
}
