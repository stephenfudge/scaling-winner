// shows all pages as separate buttons in case you want to skip to a specific page
export default function Pagination({ page, totalPages, handlePageChange }) {
  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <button
        key={i}
        className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-md hover:btn-secondary  ${
          i === page ? "btn-accent" : "btn-neutral"
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="pagination btn-group">{buttons}</div>
    </div>
  );
}
