export default function FilmsTable({ currentFilms }) {
  let style = "";

  if (currentFilms.length < 10) {
    style = "table table-compact table-zebra w-full lessthan";
  } else {
    style = "table table-compact table-zebra w-full";
  };

  return (
    <div className="overflow-x-auto">
      <table className={`${style}`}>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Media Format</th>
            <th className="max-md:hidden">Year</th>
          </tr>
        </thead>
        <tbody>
          {currentFilms.map((film) => (
            <tr key={film.id}>
              <th></th>
              <td>{film.title}</td>
              <td>{film.format}</td>
              <td className="max-md:hidden">{film.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
