import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("tv");
    const { id } = req.query;
    const filter = { _id: ObjectId(id) };
    console.log("filtered info: ", filter);

    const result = await collection.deleteOne(filter);
    console.log("result: ", result);
    res
      .status(200)
      .json({ message: `${result.deletedCount} tv(s) deleted` });
  } catch (e) {
    console.log("error: ", e);
    throw new Error(e).message;
  }
}
