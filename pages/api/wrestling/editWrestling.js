import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("wrestling");
    const { id, promotion, title, presentation, format } = req.body;
    const filter = { _id: ObjectId(id) };
    const update = { $set: { promotion, title, presentation, format } };
    const result = await collection.updateOne(filter, update);
    res
      .status(200)
      .json({ message: `${result.modifiedCount} wrestling(s) updated` });
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}
