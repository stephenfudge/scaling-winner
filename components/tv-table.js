export default function TvTable({ currentTv, message }) {
    let style = "";

    if(currentTv.length < 10 ){
      style = "table table-compact table-zebra w-full lessthan"
    }else{
      style = "table table-compact table-zebra w-full"
    }


  return (
    <div className="overflow-x-auto">
      {currentTv.length ? (
        <table className={`${style}`}>
          <thead className="text-secondary">
            <tr>
              <th></th>
              <th>Title</th>
              <th>Season</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {currentTv.map((film, index) => (
              <tr key={index}>
                <th></th>
                <td className="whitespace-normal">{film.title}</td>
                <td>{film.season}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center bgimage min-h-screen">
          <h3 className="text-xl text-white pt-40 mx-10 font-bold">{message}</h3>
        </div>
      )}
    </div>
  );
}
