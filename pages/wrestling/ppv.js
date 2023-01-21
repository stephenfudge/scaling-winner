import clientPromise from "../../lib/mongodb";

export default function WrestlingPpv({ wrestling }) {
  return (
    <div>
      <h1>Professional Wrestling PPVs</h1>
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
      .find({ presentation: "PPV" })
      .sort({})
      .toArray();

    return {
      props: { wrestling: JSON.parse(JSON.stringify(wrestling)) },
    };
  } catch (e) {
    console.error(e);
  }
}
