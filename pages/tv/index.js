import clientPromise from "../../lib/mongodb";
import Link from 'next/link';

export default function Tv ({ tv }) {
    return (
        <div>
            <h1>Television DVDs and BluRays</h1>
            <Link href='/tv/brd'><button className="btn mx-2">BluRays</button></Link>
            <Link href='/tv/dvd'><button className="btn">DVDs</button></Link>
            <ul>
                {tv.map((film) => (
                    <li>
                        <h2>{film.title}</h2>
                        <h2>{film.season}</h2>
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

        const tv = await db
            .collection("tv")
            .find({})
            .sort({title: 1, season: 1})
            // .limit(20)
            .toArray();

        return {
            props: { tv: JSON.parse(JSON.stringify(tv)) },
        };
    } catch (e) {
        console.error(e);
    }
}