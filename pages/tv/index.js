import clientPromise from "../../lib/mongodb";
import TvHeader from "../components/tv";

export default function Tv({ tv }) {
  return (
    <div>
      <h1>Television DVDs and BluRays</h1>
      <TvHeader />

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>

              <th>Season</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {tv.map((film) => (
              <tr>
                <th></th>
                <td>{film.title}</td>
                <td>{film.season}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Season</th>
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

    const tv = await db
      .collection("tv")
      .find({})
      .sort({ title: 1, season: 1 })
      // .limit(20)
      .toArray();

    return {
      props: { tv: JSON.parse(JSON.stringify(tv)) },
    };
  } catch (e) {
    console.error(e);
  }
}
