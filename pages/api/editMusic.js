import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("music");
    const { id } = req.query;
    const { artist, title, format } = req.body;

    const post = await collection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          artist: artist,
          title: title,
          format: format,
        },
      }
    );
    res.json(post);
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}
