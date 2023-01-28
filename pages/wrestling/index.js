import clientPromise from "../../lib/mongodb";
import WrestlingHeader from "../components/wrestling";

export default function Wrestling({ wrestling }) {
  return (
    <div>
      <h1>Professional Wrestling DVDs and BluRays</h1>
      <WrestlingHeader />

      {/* to have the background colour present remove the first table in classname */}
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
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const wrestling = await db
      .collection("wrestling")
      .find({})
      .sort({ promotion: 1, title: 1 })
      // .limit(20)
      .toArray();

    return {
      props: { wrestling: JSON.parse(JSON.stringify(wrestling)) },
    };
  } catch (e) {
    console.error(e);
  }
}
