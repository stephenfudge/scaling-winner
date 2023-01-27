import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    try{
        const client = await clientPromise;
        const db = client.db("movies");
        const collection = db.collection("wrestling");
        const { title, promotion, presentation, format } = await collection.insertOne(req.body);
        const post = await collection.insertOne({
            title,
            promotion,
            presentation,
            format,
        });
        res.status(200).json(post);
    }catch(e){
        console.log(e);
        throw new Error("Error adding wrestling");
    }
}