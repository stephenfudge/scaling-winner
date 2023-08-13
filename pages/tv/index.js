import clientPromise from "../../lib/mongodb";
import { useState } from "react";
import TvHeader from "../../components/tv";
import Pagination from "../../components/Pagination";
import Table from "../../components/tv-table";
import TvModal from "../../components/tvModal";

export default function Tv({ tv }) {
  const [page, setPage] = useState(1);
  const limit = 16;
  const totalPages = Math.ceil(tv.length / limit);
  const currentTv = tv.slice((page - 1) * limit, page * limit);
  const title = "Television BluRays and DVDs";
  const message = "Currently I do not own any TV shows on DVD or BluRay";

  const [selectedTv, setSelectedTv] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handlePageChange(newPage) {
    setSelectedTv(null);
    setShowModal(false);
    setPage(newPage);
  }

  const handleTitleClick = async (tvId) => {
    try {
      const response = await fetch(`/api/tv/${tvId}`);
      const data = await response.json();
      setSelectedTv(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <TvHeader title={title} />
      <Table
        currentTv={currentTv}
        message={message}
        onTitleClick={handleTitleClick}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {showModal && (
        <TvModal movieDetails={selectedTv} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const tv = await db
      .collection("tv")
      .find({})
      .sort({ title: 1, season: 1 })
      .toArray();

    return {
      props: { tv: JSON.parse(JSON.stringify(tv)) },
    };
  } catch (e) {
    console.error(e);
  }
}
