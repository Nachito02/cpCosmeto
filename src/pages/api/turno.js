import {
  handleReservation,
  isAvailableHour,
} from "./controller/turnoController";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  //consultar disponibilidad
  if (req.method === "GET") {

    const horarios = await isAvailableHour(req.query);

    res.json(horarios);
  }

  //crear el turno
  if (req.method === "POST") {
    try {
      const response = await handleReservation(req);
      console.log(response);

      res.status(200).json(response);
    } catch (error) {
        console.log(error)
    }
  }
}
