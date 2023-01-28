import React, { useState } from "react";

const AddMusic = () => {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [format, setFormat] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (artist && title && format) {
      try {
        let response = await fetch("/api/addMusic", {
          method: "POST",
          body: JSON.stringify({
            artist,
            title,
            format,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setArtist("");
        setTitle("");
        setFormat("");
        setError("");
        setMessage("Media added successfully");
      } catch (errorMessage) {
        setError(errorMessage);
      }
    } else {
      return setError("All fields are required");
    }
  };

  return (
    <div>
      <h1>Add Music</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        {/* Artist */}
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              htmlFor="artist"
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            >
              Artist
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        {/* Format */}

        {/* Input Box */}
        {/* <div className="md:flex md:items-center mb-6">

            <div className="md:w-1/3">
            <label htmlFor="format" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Format</label>
                </div>
                <div className="md:w-2/3">
            <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              />

                </div>
              </div> */}

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
    </div>
  );
};

export default AddMusic;
