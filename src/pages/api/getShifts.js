// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Shift from "./models/Shifts"
import connectDB from "./config/db"
export default async function handler(req, res) {
  connectDB()

    try {

      const getShift = await Shift.find().populate('service')

        res.status(200).json(getShift)

    } catch (error) {
        console.log(error)
    }


}
