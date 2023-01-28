import clientPromise from "../../lib/mongodb";
import FilmHeader from "../components/film";

export default function FilmsDvd({ films }) {
  return (
    <div>
      <h1>Feature Films DVDs</h1>
      <FilmHeader />
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
            {films.map((film) => (
              <tr key={film.id}>
                <th></th>
                <td>{film.title}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Media Format</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const films = await db
      .collection("films")
      .find({ format: "DVD" })
      .sort({ title: 1 })
      // .limit(20)
      .toArray();

    return {
      props: { films: JSON.parse(JSON.stringify(films)) },
    };
  } catch (e) {
    console.error(e);
  }
}
