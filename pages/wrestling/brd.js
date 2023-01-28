import { fileURLToPath } from "url";
import clientPromise from "../../lib/mongodb";
import WrestlingHeader from "../components/wrestling";

export default function WrestlingBrd({ wrestling }) {
  return (
    <div>
      <h1>Professional Wrestling BluRays</h1>
      <WrestlingHeader />
      {/* <ul>
                {wrestling.map((film) => (
                    <li>
                        <h2>{film.promotion}</h2>
                        <h2>{film.title}</h2>
                        <h2>{film.presentation}</h2>
                        <h3>{film.format}</h3>
                    </li>
                ))}
            </ul> */}
      {/* <div className="overflow-x-auto"> */}
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
                <th>{film.promotion}</th>
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
    // </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const wrestling = await db
      .collection("wrestling")
      .find({ format: "BRD" })
      .sort({promotion: 1, title: 1})
      // .limit(20)
      .toArray();

    return {
      props: { wrestling: JSON.parse(JSON.stringify(wrestling)) },
    };
  } catch (e) {
    console.error(e);
  }
}
