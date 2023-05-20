import { useState, useEffect } from "react";
import clientPromise from "../../lib/mongodb";
import { useAuth } from "../../hooks/useAuth";
import NotLoggedIn from "../../components/notLoggedIn";
import LoggedInHeader from "../../components/loggedinHeader";

export default function EditTv({ films }) {
  const { user } = useAuth();
  const [tv, setTv] = useState(films);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editSeason, setEditSeason] = useState("");
  const [editFormat, setEditFormat] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowMessage(true);
    }
  });

  useEffect(() => {
    setTv(tv);
  }, [tv]);

  const handleEdit = (id, title, season, format) => {
    setEditing(true);
    setEditId(id);
    setEditTitle(title);
    setEditSeason(season);
    setEditFormat(format);
  };

  const handleSave = async () => {
    const res = await fetch("/api/tv/editTv", {
      method: "PUT",
      body: JSON.stringify({
        id: editId,
        title: editTitle,
        season: editSeason,
        format: editFormat,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.message) {
      setEditing(false);
      setEditId("");
      setEditTitle("");
      setEditSeason("");
      setEditFormat("");
      setTv(
        tv.map((tv) => {
          if (tv._id === editId) {
            return {
              ...tv,
              title: editTitle,
              season: editSeason,
              format: editFormat,
            };
          } else {
            return tv;
          }
        })
      );
    }
  };

  return (
    <div className="overflow x-auto">
      {!user && showMessage && <NotLoggedIn />}
      {user && (
        <>
          <LoggedInHeader />
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold underline">Edit Television</h2>
            <table className="table table-compact table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Season</th>
                  <th>Format</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tv.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.season}</td>
                    <td>{movie.format}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleEdit(
                            movie._id,
                            movie.title,
                            movie.season,
                            movie.format
                          )
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {editing && (
              <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75">
                <div className="modal-box relative p-8 bg-white w-1/2 mx-auto my-16 rounded-lg shadow-lg">
                  <h2 className="modal-header pb-1">Edit TV</h2>
                  <form className="w-full max-w-sm">
                    {/* Title */}
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="title"
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        >
                          Title
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="text"
                          name="title"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Season */}
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="season"
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        >
                          Season
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="number"
                          step="1"
                          name="season"
                          value={editSeason}
                          onChange={(e) =>
                            parseInt(setEditSeason(e.target.value))
                          }
                        />
                      </div>
                    </div>

                    {/* Format Dropdown */}
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="format"
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        >
                          Format
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <select
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          name="format"
                          value={editFormat}
                          onChange={(e) => setEditFormat(e.target.value)}
                        >
                          <option value="" disabled>
                            Select Format
                          </option>
                          <option value="BRD">BRD</option>
                          <option value="DVD">DVD</option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <div className="flex justify-between pt-3">
                    <button className="btn btn-outline" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="btn btn-error btn-ouline"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
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
      .collection("tv")
      .find()
      .sort({ title: 1, season: 1 })

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
