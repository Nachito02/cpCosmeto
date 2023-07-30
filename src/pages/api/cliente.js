import { getCliente } from "./controller/userController";
export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(400).end();
  }

  if (req.method === "GET") {
    const { email } = req.query;

    try {
      const cliente = await getCliente(email);

      return res.status(200).json(cliente);
    } catch (error) {
      console.log(error);

      return res.status(404).end();
    }
  }
}
