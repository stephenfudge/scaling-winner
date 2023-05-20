import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("music");
    const { id, artist, title, format } = req.body;
    const filter = { _id: ObjectId(id) };
    const update = { $set: { artist, title, format } };
    const result = await collection.updateOne(filter, update);
    res
      .status(200)
      .json({ message: `${result.modifiedCount} music(s) updated` });
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}
