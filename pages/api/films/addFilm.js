import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("films");
    const { title, format, year } = req.body;
    
    const yearInt = parseInt(year, 10)
    
    const post = await collection.insertOne({
      title,
      format,
      year: yearInt
    });
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}
