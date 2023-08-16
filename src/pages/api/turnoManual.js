import { addTurnoManual, getManualTurno } from "./controller/turnoController";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  if (req.method === "GET") {
    try {
      const response = await getManualTurno();

      res.status(200).json(response);
    } catch (error) {
      return res.status(405).json("Hubo un error");
    }
  }

  //crear el turno
  if (req.method === "POST") {
    try {
      const response = await addTurnoManual(req.body);

      res.status(200).json(response);
    } catch (error) {
      return res.status(405).json("Hubo un error");
    }
  }
}
