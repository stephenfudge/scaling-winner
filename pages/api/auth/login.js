import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import clientPromise from "../../../lib/mongodb";

// if i create a new user this will hash the password the first time i try to login then i should be able to login without issue
// async function updatePassword(username, password) {
//   const client = await clientPromise;
//   const users = client.db("movies").collection("user");

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const result = await users.updateOne({ username }, { $set: { password: hashedPassword } });
//   return result.modifiedCount;
// }

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;
  console.log("user:", user);
  console.log("password:", password);

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const client = await clientPromise;
  const users = client.db("movies").collection("user");
  const user = await users.findOne({ username });
  console.log("user2:", user)

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  console.log("passmatch:", passwordMatch)
  if (!passwordMatch) {
    // Update password if it's not already hashed
    const isPasswordHashed = await bcrypt.compare(password, user.password);
    if (!isPasswordHashed) {
      await updatePassword(username, password);
    }
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
}
