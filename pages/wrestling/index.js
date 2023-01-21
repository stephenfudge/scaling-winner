import clientPromise from "../../lib/mongodb";
import Link from "next/link";

export default function Wrestling({ wrestling }) {
  return (
    <div>
      <h1>Professional Wrestling DVDs and BluRays</h1>
      <Link href="/wrestling/brd">
        <button>BluRays</button>
      </Link>
      <Link href="/wrestling/dvd">
        <button>DVDs</button>
      </Link>
      <Link href="/wrestling/compilation">
        <button>Compilations</button>
      </Link>
      <Link href="/wrestling/documentary">
        <button>Documentaries</button>
      </Link>
      <Link href="/wrestling/ppv">
        <button>PPVs</button>
      </Link>
      <Link href="/wrestling/wwe">
        <button>WWE Content</button>
      </Link>
      <Link href="/wrestling/nonwwe">
        <button>Non WWE Content</button>
      </Link>
      <ul>
        {wrestling.map((film) => (
          <li>
            <h2>{film.promotion}</h2>
            <h2>{film.title}</h2>
            <h2>{film.presentation}</h2>
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

    const wrestling = await db
      .collection("wrestling")
      .find({})
      .sort({})
      // .limit(20)
      .toArray();

    return {
      props: { wrestling: JSON.parse(JSON.stringify(wrestling)) },
    };
  } catch (e) {
    console.error(e);
  }
}
