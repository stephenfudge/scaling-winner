import React, { useState } from "react";

export default function AddWrestling() {
  const [title, setTitle] = useState("");
  const [promotion, setPromotion] = useState("");
  const [presentation, setPresentation] = useState("");
  const [format, setFormat] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && presentation && promotion && format) {
      try {
        let response = await fetch("/api/addWrestling", {
          method: "POST",
          body: JSON.stringify({
            title,
            promotion,
            presentation,
            format,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        response = await response.json();
        setTitle("");
        setPromotion("");
        setPresentation("");
        setFormat("");
        setMessage("Media added successfully!");
      } catch (errorMessage) {
        setMessage(errorMessage);
      }
    } else {
      return setError("Please fill out all fields");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Add Wrestling</h1>
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
          <div>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
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
              value={promotion}
              onChange={(e) => setPromotion(e.target.value)}
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
              value={presentation}
              onChange={(e) => setPresentation(e.target.value)}
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
        {/* Format */}
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
              <option value="BRD">BluRay</option>
              <option value="DVD">DVD</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add to Wrestling
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
