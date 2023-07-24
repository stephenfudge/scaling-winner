export default function WrestlingTable({ currentWrestling }) {
  let style = "";

  if (currentWrestling.length < 10) {
    style = "table table-compact table-zebra w-full  lessthan"
  } else {
    style = "table table-compact table-zebra w-full "
  };

  return (
    <div className="pl-6"> 
      <table className={`${style}`}>
        <thead className="text-secondary">
          <tr>
            <th></th>
            <th>Promotion</th>
            <th>Title</th>
            <th className="max-md:hidden" >Presentation Style</th>
            <th className="max-md:hidden">Media Format</th>
          </tr>
        </thead>
        <tbody>
          {currentWrestling.map((film, index) => (
            <tr key={index}>
              <th></th>
              <td>{film.promotion}</td>
              <td className="whitespace-normal">{film.title}</td>
              <td className="max-md:hidden">{film.presentation}</td>
              <td className="max-md:hidden">{film.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
