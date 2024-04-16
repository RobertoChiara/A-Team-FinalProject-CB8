import dbConnect from "../../../db";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.ACCESSTOKEN_SECRET;

// Connect to MongoDB
dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let { username, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      let newUser = new User({
        username,
        password: hashedPassword,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate JWT
      const token = jwt.sign({ userId: newUser._id }, secretKey, {
        expiresIn: "1h",
      });

      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "User already exists" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
