// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {connectDB, disconnectDB} from "./config/db";
import { getProfesionalsPerCategory } from "./controller/profesionalController";
export default async function handler(req, res) {
 await connectDB()
  if (req.method === "GET") {
    const { categoria } = req.query;
    try {
      const professional = await getProfesionalsPerCategory(categoria)

      res.status(200).json(professional)
    } catch (error) {
      res.status(400).json(error.message);
    }

  }

}
