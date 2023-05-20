// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Shifts from "./models/Shifts"
import connectDB from "./config/db"
export default async function handler(req, res) {
  connectDB()

  console.log(req.body)

  const {idService,nameService, name,horario, phone,value} = req.body


    try {

      

      const newShift = await Shifts.create({
        name: name,
        hour:horario,
        date:value,
        phone: phone,
        service:idService,
      })

        console.log(newShift)
    } catch (error) {
        console.log(error)
    }


  res.status(200).json({ name: 'John Doe' })
}
