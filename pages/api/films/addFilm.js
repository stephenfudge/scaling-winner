import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  
  try {
    const client = await clientPromise;
    const db = client.db("movies");
    const collection = db.collection("films");
    const { title, format, year, tmdb_id } = req.body;
    
    const yearInt = parseInt(year, 10)
    
    const post = await collection.insertOne({
      title,
      format,
      year: yearInt, 
      tmdb_id
    });
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    throw new Error(e).message;
  }
}


// add tmdb_id as int32 here and in the add frontend logic
