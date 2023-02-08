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
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Season</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {currentTv.map((film) => (
              <tr>
                <th></th>
                <td>{film.title}</td>
                <td>{film.season}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center bgimage min-h-screen">
          <h3 className="text-xl text-black p-10 mx-10">{message}</h3>
        </div>
      )}
    </div>
  );
}
