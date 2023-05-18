// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Shifts from "./models/Shifts"
export default function handler(req, res) {

    console.log(req.body)


  res.status(200).json({ name: 'John Doe' })
}
