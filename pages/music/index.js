import clientPromise from "../../lib/mongodb";
import Link from "next/link";
import MusicHeader from "../components/music";

export default function Music({ music }) {
  return (
    <div>
      <h1>Music DVDs and BluRays</h1>
      <MusicHeader />

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead className="text-secondary">
            <tr>
              <th></th>
              <th>Artist</th>
              <th>Title</th>
              <th>Format</th>
            </tr>
          </thead>
          <tbody>
            {music.map((film) => (
              <tr>
                <th></th>
                <td>{film.artist}</td>
                <td>{film.title}</td>
                <td>{film.format}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Artist</th>
              <th>Title</th>
              <th>Format</th>
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

    const music = await db
      .collection("music")
      .find({})
      .sort({ artist: 1, title: 1 })
      // .limit(20)
      .toArray();

    return {
      props: { music: JSON.parse(JSON.stringify(music)) },
    };
  } catch (e) {
    console.error(e);
  }
}
