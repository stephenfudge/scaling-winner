import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("tv");
    const { title, season, format, tmdb_id } = req.body;

    const seasonInt = parseInt(season, 10)

    const post = await collection.insertOne({
      title,
      season: seasonInt,
      format,
      tmdb_id
    });
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}
