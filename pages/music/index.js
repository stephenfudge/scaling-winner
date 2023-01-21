import clientPromise from "../../lib/mongodb";
import Link from 'next/link';

export default function Music({ music }) {
  return (
    <div>
      <h1>Music DVDs and BluRays</h1>
      <Link href='/music/brd'><button>BluRays</button></Link>
      <Link href='/music/dvd'><button>DVDs</button></Link>
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
      .find({})
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
