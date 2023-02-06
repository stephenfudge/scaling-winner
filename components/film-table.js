export default function FilmsTable({ currentFilms }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Media Format</th>
          </tr>
        </thead>
        <tbody>
          {currentFilms.map((film) => (
            <tr key={film.id}>
              <th></th>
              <td>{film.title}</td>
              <td>{film.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
