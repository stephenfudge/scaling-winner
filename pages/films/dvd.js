import clientPromise from "../../lib/mongodb";

export default function FilmsDvd({ films }) {
  return (
    <div>
       <h1>Feature Films DVDs</h1>
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
      .find({ format: "DVD" })
      .sort({})
      // .limit(20)
      .toArray();

    return {
      props: { films: JSON.parse(JSON.stringify(films)) },
    };
  } catch (e) {
    console.error(e);
  }
}
