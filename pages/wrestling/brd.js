import clientPromise from "../../lib/mongodb";

export default function WrestlingBrd ({ wrestling }) {
    return(
        <div>
            <h1>Professional Wrestling BluRays</h1>
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
    )
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("movies");

        const wrestling = await db
            .collection("wrestling")
            .find({format: "BRD"})
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