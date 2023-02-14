export default function WrestlingTable({ currentWrestling }) {
  let style = "";

  if (currentWrestling.length < 10) {
    style = "table table-compact table-zebra w-full table-auto lessthan"
  } else {
    style = "table table-compact table-zebra w-full table-auto"
  };

  return (
    <div >
      <table className={`${style}`}>
        <thead>
          <tr>
            <th></th>
            <th>Promotion</th>
            <th>Title</th>
            <th className="max-md:hidden" >Presentation Style</th>
            <th className="max-md:hidden">Media Format</th>
          </tr>
        </thead>
        <tbody>
          {currentWrestling.map((film) => (
            <tr key={film.id}>
              <th></th>
              <td>{film.promotion}</td>
              <td>{film.title}</td>
              <td className="max-md:hidden">{film.presentation}</td>
              <td className="max-md:hidden">{film.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
