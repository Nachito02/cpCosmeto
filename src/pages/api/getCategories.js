// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Categoria from "./models/Categoria"
import connectDB from "./config/db"

export default async function handler(req, res) {

        try {

            const services = await Categoria.find()
            res.status(200).json(services)
        } catch (error) {
            console.log('error')
            res.status(400).json(error.message)
        }
}
