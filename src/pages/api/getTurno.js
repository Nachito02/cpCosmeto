import { getTurno } from "./controller/turnoController";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(402).end();
  }
  if (req.method === "GET") {
        const {idTurno} = req.query
    const turno = await getTurno(idTurno);

    res.status(200).json(turno);
  }
}
