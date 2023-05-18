// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "./config/db"
import Category from "./models/Category"
import Service from "./models/Service"


export default async function handler(req, res) {
    connectDB()

        if(req.method === 'POST') {
            try {

                const services = await Service.find({category : req.body.categoryID})
                res.status(200).json(services)
            } catch (error) {
                console.log('error')
                res.status(400).json(error.message)
            }
        }

      
}
