// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "./config/db"
import Service from "./models/Categories"


export default async function handler(req, res) {
    connectDB()
        try {
            const services = await Service.find()
            res.status(200).json(services)
        } catch (error) {
            console.log('error')
            res.status(400).json(error.message)
        }


}
