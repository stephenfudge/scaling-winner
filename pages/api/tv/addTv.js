import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("tv");
    const { title, season, format } = req.body;
    const post = await collection.insertOne({
      title,
      season,
      format,
    });
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}
