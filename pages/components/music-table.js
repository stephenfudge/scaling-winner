export default function MusicTable({ currentMusic }) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact table-zebra w-full">
        <thead className="text-secondary">
          <tr>
            <th></th>
            <th>Artist</th>
            <th>Title</th>
            <th>Media Format</th>
          </tr>
        </thead>
        <tbody>
          {currentMusic.map((film) => (
            <tr>
              <th></th>
              <td>{film.artist}</td>
              <td>{film.title}</td>
              <td>{film.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
