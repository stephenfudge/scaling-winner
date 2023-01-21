import clientPromise from "../../lib/mongodb";

export default function MusicBrd({ music }) {
  return (
    <div>
      <h1>Music DVDs and BluRays</h1>
           <ul>
        {music.map((film) => (
          <li>
            <h2>{film.artist}</h2>
            <h2>{film.title}</h2>
            <h3>{film.format}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("movies");

    const music = await db
      .collection("music")
      .find({ format: "BRD"})
      .sort({})
      // .limit(20)
      .toArray();

    return {
      props: { music: JSON.parse(JSON.stringify(music)) },
    };
  } catch (e) {
    console.error(e);
  }
}
