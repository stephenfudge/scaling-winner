import clientPromise from "../../lib/mongodb";

export default function WWE ({ wwe }){
    return(
        <div>
            <h1>WWE DVDs and BluRays</h1>
            <ul>
                {wwe.map((film) => (
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

        const wwe = await db
            .collection("wrestling")
            .find({ promotion: 'WWE'})
            .sort({})
            // .limit(20)
            .toArray();

        return {
            props: { wwe: JSON.parse(JSON.stringify(wwe)) },
        };
    } catch (e) {
        console.error(e);
    }
}