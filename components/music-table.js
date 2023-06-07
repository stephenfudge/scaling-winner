export default function MusicTable({ currentMusic }) {
  let style = "";

  if (currentMusic.length < 10) {
    style = "table table-compact table-zebra w-full lessthan";
  } else {
    style = "table table-compact table-zebra w-full";
  }

  return (
    <div className="overflow-x-auto">
      <table className={`${style}`}>
        <thead className="text-secondary">
          <tr>
            <th></th>
            <th>Artist</th>
            <th>Title</th>
            <th className="max-md:hidden">Media Format</th>
          </tr>
        </thead>
        <tbody>
          {currentMusic.map((film, index) => (
            <tr key={index}>
              <th></th>
              <td>{film.artist}</td>
              <td>{film.title}</td>
              <td className="max-md:hidden">{film.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
