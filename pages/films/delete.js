import { useState } from "react";
import clientPromise from "../../lib/mongodb";
import LoggedInHeader from "../../components/loggedinHeader";

export default function DeleteFilms({ films }) {
  const [movies, setMovies] = useState(films);
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deletingMovie, setDeletingMovie] = useState(null);

  const handleDelete = (id, movie) => {
    setDeleting(true);
    setDeleteId(id);
    setDeletingMovie(movie);
  };

  const handleConfirm = async () => {
    const res = await fetch(`/api/deleteFilm?id=${deleteId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.message) {
      setDeleting(false);
      setDeleteId("");
      setMovies(movies.filter((movie) => movie._id !== deleteId));
    }
  };

  return (
    <div className="overflow-x-auto">
      <LoggedInHeader />
      <div className="container mx-auto px-4">
        <h2 className="text-xl text-center pb-2">Films</h2>
        <table className="table table-compact table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Format</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
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

        {deleting && deletingMovie && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75">
            <div className="modal-box relative p-8 bg-white w-1/2 mx-auto my-16 rounded-lg shadow-lg">
              <h2 className="modal-header pb-1">Confirm Delete</h2>
              <p className="pb-4">
                Are you sure you want to delete the movie {deletingMovie.title}?
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
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const films = await db
      .collection("films")
      .find({})
      .sort({ title: 1 })
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
