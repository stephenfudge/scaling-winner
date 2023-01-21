import clientPromise from "../../lib/mongodb";

export default function NonWWE ({ nonwwe }) {
    return (
        <div>
            <h1>Non WWE DVDs and BluRays</h1>
            <ul>
                {nonwwe.map((film) => (
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

        const nonwwe = await db
            .collection("wrestling")
            .find({ promotion: {$ne: 'WWE'}})
            .sort({})
            // .limit(20)
            .toArray();

        return {
            props: { nonwwe: JSON.parse(JSON.stringify(nonwwe)) },
        };
    } catch (e) {
        console.error(e);
    }
}