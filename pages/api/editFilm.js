import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  console.log(req.body)
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("films");
    const { id, title, format } = req.body;
    const filter = { _id: ObjectId(id)}
    const update = { $set: {title, format} };
    const result = await collection.updateOne(filter, update);
    res.status(200).json({ message: `${result.modifiedCount} movie(s) updated` });
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}