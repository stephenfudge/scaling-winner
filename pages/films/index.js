import clientPromise from "../../lib/mongodb";
import Link from "next/link";

export default function Films({ films }) {
  return (
    <div>
      <h1>Feature Films</h1>
      <Link href="/films/brd">
        <button className="btn mx-2">BluRays</button>
      </Link>
      <Link href="/films/dvd">
        <button className="btn">DVDs</button>
      </Link>
      <ul>
        {films.map((film) => (
          <li>
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

    const films = await db
      .collection("films")
      .find({})
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
