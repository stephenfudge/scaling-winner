import clientPromise from "../../lib/mongodb";

export default function TvBrd({tv}){
    return(
        <div>
            <h1>TV BluRays</h1>
            <ul>
                {tv.map((film) => (
                    <li>
                        <h2>{film.title}</h2>
                        <h3>{film.season}</h3>
                        <h3>{film.format}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps(){
    try{
        const client = await clientPromise;
        const db = client.db("movies");

        const tv = await db
            .collection("tv")
            .find({format: "BRD"})
            .sort({title: 1, season: 1})
            .toArray();

        return {
            props: {tv: JSON.parse(JSON.stringify(tv))}
        };
    } catch(e){
        console.error(e);
    }
}