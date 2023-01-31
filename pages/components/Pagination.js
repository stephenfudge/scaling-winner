// shows previous and next buttons only with a span in the middle saying what page number you're on of how many total

// export default function Pagination ({ page, totalPages, handlePageChange }) {
//   return (
//     <div className="pagination">
//       <button
//         className="btn btn-secondary"
//         disabled={page === 1}
//         onClick={() => handlePageChange(page - 1)}
//       >
//         Previous
//       </button>
//       <span>{page} of {totalPages}</span>
//       <button
//         className="btn btn-secondary"
//         disabled={page === totalPages}
//         onClick={() => handlePageChange(page + 1)}
//       >
//         Next
//       </button>
//     </div>
//   );
// };


// trying out to see which i like better

// shows all pages as separate buttons in case you want to skip to a specific page
export default function Pagination({ page, totalPages, handlePageChange }) {
  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <button
        key={i}
        className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:btn-secondary  ${i === page ? 'btn-accent' : 'btn-neutral'}`}
        // disabled={i === 1 && page === 1 || i === totalPages && page === totalPages}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination btn-group">
      {buttons}
    </div>
  );
}

