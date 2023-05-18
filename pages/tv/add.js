import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import LoggedInHeader from "../../components/loggedinHeader";

export default function AddTv() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState();
  const [format, setFormat] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowMessage(true);
      const timeout = setTimeout(() => {
        router.push("/");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && season && format) {
      try {
        let response = await fetch("/api/addTv", {
          method: "POST",
          body: JSON.stringify({
            title,
            season,
            format,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setTitle("");
        setSeason();
        setFormat("");
        setError("");
        setMessage(
          `Successfully added season ${season} of "${title}" in the "${format}" format!`
        );
      } catch (errorMessage) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };

  return (
    <div>
      {!user && showMessage && (
        <p>You do not have access to this page as you are not logged in</p>
      )}
      {user && (
        <>
          <LoggedInHeader />
          <h1>Add TV</h1>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={season}
                  onChange={(e) => parseInt(setSeason(e.target.value))}
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
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value="" disabled>
                    Select Format
                  </option>
                  <option value="BRD">BRD</option>
                  <option value="DVD">DVD</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  type="submit"
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <div>{message && <p> {message}</p>}</div>
        </>
      )}
    </div>
  );
}
