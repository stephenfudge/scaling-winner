// modal that opens when clicking on titles. displays poster image, title, overview and a link to imdb provided TMDB API
export default function MovieModal({ movieDetails, onClose }) {
  if (!movieDetails) return null;

  // stops modal from closing unless clicked outside of modal or on close button
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-10"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-4 md:w-96 w-full max-w-sm mx-auto"
        onClick={stopPropagation}
      >
        {/* movie poster at medium and above screen sizes, hidden on mobile devices */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="mb-4 md:block hidden"
        />

        {/* movie title  */}
        <h2 className="text-xl text-center font-semibold mb-2">
          {movieDetails.title}
        </h2>

        {/* summary of movie limited to 200 characters */}
        <p maxLength={200} className="mb-4 md:text-base text-sm">
          {movieDetails.overview}
        </p>

        {/* link to the movie's imdb page */}
        <a
          href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on IMDb
        </a>
        <button onClick={onClose} className="ml-4">
          Close
        </button>
      </div>
    </div>
  );
}
