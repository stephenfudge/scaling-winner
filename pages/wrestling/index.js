import clientPromise from "../../lib/mongodb";
import Link from "next/link";

export default function Wrestling({ wrestling }) {
  return (
    <div>
      <h1>Professional Wrestling DVDs and BluRays</h1>
      {/* <Link href="/wrestling/brd">
        <button className="btn">BluRays</button>
      </Link>
      <Link href="/wrestling/dvd">
        <button className="btn">DVDs</button>
      </Link>
      <Link href="/wrestling/compilation">
        <button className="btn">Compilations</button>
      </Link>
      <Link href="/wrestling/documentary">
        <button className="btn">Documentaries</button>
      </Link>
      <Link href="/wrestling/ppv">
        <button className="btn">PPVs</button>
      </Link>
      <Link href="/wrestling/wwe">
        <button className="btn">WWE Content</button>
      </Link>
      <Link href="/wrestling/nonwwe">
        <button className="btn">Non WWE Content</button>
      </Link> */}
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          Media Format
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/wrestling/brd">BluRays</a>
          </li>
          <li>
            <a href="/wrestling/dvd">DVDs</a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          Presentation Style
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/wrestling/compilation">Compilations</a>
          </li>
          <li>
            <a href="/wrestling/documentary">Documentaries</a>
          </li>
          <li>
            <a href="/wrestling/ppv">PPVs</a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <label tabIndex={0} className="btn m-1">
          Promotion
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a href="/wrestling/nonwwe">Non WWE Content</a>
          </li>
          <li>
            <a href="/wrestling/wwe">WWE Content</a>
          </li>
        </ul>
      </div>

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
