import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("wrestling");
    const { id } = req.query;
    const filter = { _id: ObjectId(id) };

    const result = await collection.deleteOne(filter);

    res
      .status(200)
      .json({ message: `${result.deletedCount} music(s) deleted` });
  } catch (e) {
    console.log("error: ", e);
    throw new Error(e).message;
  }
}
