// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Shifts from "./models/Turno"
export default async function handler(req, res) {


  const {idService,nameService, name,horario, phone,value} = req.body

    try {
      const newShift = await Shifts.create({
        name: name,
        hour:horario,
        date:value,
        phone: phone,
        service:idService,
        status: 'pendiente'
      })

        //console.log(newShift)
    } catch (error) {
        console.log(error)
    }


  res.status(200).json({ name: 'John Doe' })
}
