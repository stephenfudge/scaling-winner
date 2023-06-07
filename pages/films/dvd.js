import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import FilmHeader from "../../components/film";
import Pagination from "../../components/Pagination";
import Table from "../../components/film-table";

export default function FilmsDvd({ dvd }) {
  const [page, setPage] = useState(1);
  const limit = 18;
  const totalPages = Math.ceil(dvd.length / limit);
  const isLastPage = page === totalPages;
  const adjustedLimit = isLastPage ? limit + 1 : limit;
  const startIndex = isLastPage ? (page - 2) * limit + 1 : (page - 1) * limit;
  const currentFilms = dvd.slice(startIndex, startIndex + adjustedLimit);
  const title = "Feature Films DVDs";

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
          $match: { format: "DVD" },
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
      props: { dvd: JSON.parse(JSON.stringify(films)) },
    };
  } catch (e) {
    console.error(e);
  }
}
