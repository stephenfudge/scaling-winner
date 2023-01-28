import clientPromise from "../../lib/mongodb";
import WrestlingHeader from "../components/wrestling";

export default function NonWWE({ nonwwe }) {
  return (
    <div>
      <h1>Non WWE DVDs and BluRays</h1>
      <WrestlingHeader />
      <div>
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
            {nonwwe.map((film) => (
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
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const nonwwe = await db
      .collection("wrestling")
      .find({ promotion: { $ne: "WWE" } })
      .sort({ promotion: 1, title: 1})
      .toArray();

    return {
      props: { nonwwe: JSON.parse(JSON.stringify(nonwwe)) },
    };
  } catch (e) {
    console.error(e);
  }
}
