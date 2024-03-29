export default function FilmsTable({ currentFilms, onTitleClick }) {
  let style = "";

  if (currentFilms.length < 10) {
    style = "table table-compact table-zebra w-full lessthan";
  } else {
    style = "table table-compact table-zebra w-full";
  };

  return (
    <div className="overflow-x-auto">
      <table className={`${style}`}>
        <thead className="text-secondary">
          <tr>
            <th></th>
            <th>Title</th>
            <th>Media Format</th>
            <th className="max-md:hidden">Year</th>
          </tr>
        </thead>
        <tbody>
          {currentFilms.map((film, index) => (
            <tr key={index}>
              <th></th>
              <td className="whitespace-normal cursor-pointer" onClick={() => onTitleClick(film.tmdb_id)}>{film.title}</td>
              <td>{film.format}</td>
              <td className="max-md:hidden">{film.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
