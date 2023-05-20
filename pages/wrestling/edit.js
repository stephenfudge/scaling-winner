import { useState, useEffect } from "react";
import clientPromise from "../../lib/mongodb";
import { useAuth } from "../../hooks/useAuth";
import NotLoggedIn from "../../components/notLoggedIn";
import LoggedInHeader from "../../components/loggedinHeader";

export default function EditWrestling({ films }) {
  const { user } = useAuth();
  const [wrestling, setWrestling] = useState(films);
  const [editing, setEditing] = useState("");
  const [editId, setEditId] = useState("");
  const [editPromotion, setEditPromotion] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editPresentation, setEditPresentation] = useState("");
  const [editFormat, setEditFormat] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowMessage(true);
    }
  });

  useEffect(() => {
    setWrestling(wrestling);
  }, [wrestling]);

  const handleEdit = (id, promotion, title, presentation, format) => {
    setEditing(true);
    setEditId(id);
    setEditPromotion(promotion);
    setEditTitle(title);
    setEditPresentation(presentation);
    setEditFormat(format);
  };

  const handleSave = async () => {
    const res = await fetch("/api/wrestling/editWrestling", {
      method: "PUT",
      body: JSON.stringify({
        id: editId,
        promotion: editPromotion,
        title: editTitle,
        presentation: editPresentation,
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
      setEditPromotion("");
      setEditTitle("");
      setEditPresentation("");
      setEditFormat("");
      setWrestling(
        wrestling.map((wrestling) => {
          if (wrestling._id === editId) {
            return {
              ...wrestling,
              promotion: editPromotion,
              title: editTitle,
              presentation: editPresentation,
              format: editFormat,
            };
          } else {
            return wrestling;
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
            <h2 className="text-xl font-bold underline">Edit Wrestling</h2>
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
                      <button
                        onClick={() =>
                          handleEdit(
                            movie._id,
                            movie.promotion,
                            movie.title,
                            movie.presentation,
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
                  <h2 className="modal-header pb-1">Edit Wrestling</h2>
                  <form className="w-full max-w-sm">
                    {/* Promotion */}
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="promotion"
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        >
                          Promotion
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          type="text"
                          name="promotion"
                          value={editPromotion}
                          onChange={(e) => setEditPromotion(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Presentation Type */}
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/3">
                        <label
                          htmlFor="presentation"
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        >
                          Presentation Type
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <select
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          name="presentation"
                          value={editPresentation}
                          onChange={(e) => setEditPresentation(e.target.value)}
                        >
                          <option value="" disabled>
                            {" "}
                            Select Presentation Type
                          </option>
                          <option value="Compilation">Compilation</option>
                          <option value="Documentary">Documentary</option>
                          <option value="PPV">Pay Per View</option>
                        </select>
                      </div>
                    </div>

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
