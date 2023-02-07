export default function MusicTable({ currentMusic }) {
    const variable1 = currentMusic.length;
    console.log(variable1);
    let style = "";

    if (currentMusic.length < 10){
     style = "table table-compact table-zebra w-full lessthan"
    }else{
      style = "table table-compact table-zebra w-full"
    }

  return (
    <div className="overflow-x-auto">
      <table className={`${style}`}>
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
