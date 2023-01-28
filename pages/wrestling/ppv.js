import clientPromise from "../../lib/mongodb";
import WrestlingHeader from "../components/wrestling";

export default function WrestlingPpv({ wrestling }) {
  return (
    <div>
      <h1>Professional Wrestling PPVs</h1>
      <WrestlingHeader />
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Promotion</th>
              <th>Title</th>
              <th>Presentation Style</th>
              <th>Media Format</th>
            </tr>
          </thead>
          <tbody>
            {wrestling.map((film) => (
              <tr key={film.id}>
                <th></th>
                <td>{film.promotion}</td>
                <td>{film.title}</td>
                <td>{film.presentation}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Promotion</th>
              <th>Title</th>
              <th>Presentation Style</th>
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

    const wrestling = await db
      .collection("wrestling")
      .find({ presentation: "PPV" })
      .sort({})
      .toArray();

    return {
      props: { wrestling: JSON.parse(JSON.stringify(wrestling)) },
    };
  } catch (e) {
    console.error(e);
  }
}
