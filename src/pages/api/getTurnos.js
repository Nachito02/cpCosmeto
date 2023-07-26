import { getTurnos } from "./controller/turnoController";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(402).end();
  }
  if (req.method === "GET") {
    const turnos = await getTurnos();

    res.status(200).json(turnos);
  }
}
