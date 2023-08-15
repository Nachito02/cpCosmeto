// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Estudio from "./models/Estudio";
import { connectDB } from "./config/db";

export default async function handler(req, res) {
  await connectDB();
  try {
    const estudio = await Estudio.find();
    res.status(200).json(estudio);
  } catch (error) {
    console.log("error");
    res.status(400).json(error.message);
  }
}
