import Servicio from "./models/Servicio";

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(400).end();
  }

  if (req.method === "GET") {
    try {
      const servicios = await Servicio.find();

      return res.status(200).json(servicios);
    } catch (error) {
      console.log(error);
      console.log(error);
      return res.status(404).end();
    }
  }
}
