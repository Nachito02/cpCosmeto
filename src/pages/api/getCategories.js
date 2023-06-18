// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Categoria from "./models/Categoria"
import {connectDB,disconnectDB} from "./config/db"

export default async function handler(req, res) {
   await connectDB()
        try {

            const services = await Categoria.find()
            res.status(200).json(services)
            
        } catch (error) {
            console.log('error')
            res.status(400).json(error.message)
        }

}
