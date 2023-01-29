export default function Pagination ({ page, totalPages, handlePageChange }) {
  return (
    <div className="pagination">
      <button
        className="btn btn-secondary"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span>{page} of {totalPages}</span>
      <button
        className="btn btn-secondary"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};
