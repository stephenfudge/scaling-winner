// modal that opens when clicking on titles. displays poster image, title, overview and a link to imdb provided TMDB API
export default function MovieModal ({ movieDetails, onClose })  {
    if (!movieDetails) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-white rounded-lg p-4 w-96">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{movieDetails.title}</h2>
          <p className="mb-4">{movieDetails.overview}</p>
          <a
            href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on IMDb
          </a>
          <button onClick={onClose} className="ml-4">Close</button>
        </div>
      </div>
    );
  };
  
