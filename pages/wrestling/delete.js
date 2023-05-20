import { useState, useEffect } from "react";
import clientPromise from "../../lib/mongodb";
import { useAuth } from "../../hooks/useAuth";
import NotLoggedIn from "../../components/notLoggedIn";
import LoggedInHeader from "../../components/loggedinHeader";

export default function DeleteWrestling({ films }) {
  const { user } = useAuth();
  const [wrestling, setWrestling] = useState(films);
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deletingWrestling, setDeletingWrestling] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowMessage(true);
    }
  });

  const handleDelete = (id, movie) => {
    setDeleting(true);
    setDeleteId(id);
    setDeletingWrestling(movie);
  };

  const handleConfirm = async () => {
    const res = await fetch(`/api/wrestling/deleteWrestling?id=${deleteId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.message) {
      setDeleting(false);
      setDeleteId("");
      setWrestling(wrestling.filter((movie) => movie._id !== deleteId));
    }
  };

  return (
    <div className="overflow-x-auto">
      {!user && showMessage && <NotLoggedIn />}
      {user && (
        <>
          <LoggedInHeader />
          <div className="container mx-auto px-4">
            <h2 className="text-xl text-center pb-2">Delete Wrestling</h2>
            <table className="table table-compact table-zebra w-full">
              <thead>
                <tr>
                  <th>Promotion</th>
                  <th>Title</th>
                  <th>Presentation</th>
                  <th>Format</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wrestling.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.promotion}</td>
                    <td>{movie.title}</td>
                    <td>{movie.presentation}</td>
                    <td>{movie.format}</td>
                    <td>
                      <button onClick={() => handleDelete(movie._id, movie)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {deleting && deletingWrestling && (
              <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75">
                <div className="modal-box relative p-8 bg-white w-1/2 mx-auto my-16 rounded-lg shadow-lg">
                  <h2 className="modal-header pb-1">Confirm Delete</h2>
                  <p className="pb-4">
                    Are you sure you want to delete{" "}
                    {deletingWrestling.promotion} {deletingWrestling.title}?
                  </p>
                  <div className="flex justify-between">
                    <button className="btn btn-danger" onClick={handleConfirm}>
                      Yes
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => setDeleting(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const films = await db
      .collection("wrestling")
      .find({})
      .sort({ promotion: 1, title: 1 })
      .collation({
        locale: "en_US",
        numericOrdering: true,
      })
      .toArray();

    return {
      props: {
        films: JSON.parse(JSON.stringify(films)),
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
