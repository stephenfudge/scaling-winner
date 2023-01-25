import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("movies");
        const collection = db.collection("films");
        const { title, format } = req.body;
        const post = await collection.insertOne({
        title,
        format,
        });
        res.status(200).json(post);
    } catch (e) {
        console.log(e);
        throw new Error(e).message;
    }
}