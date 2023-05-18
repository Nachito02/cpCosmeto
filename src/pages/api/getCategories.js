// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Category from "./models/Category"
import connectDB from "./config/db"

export default async function handler(req, res) {
    connectDB()

        try {

            const services = await Category.find()
            res.status(200).json(services)
        } catch (error) {
            console.log('error')
            res.status(400).json(error.message)
        }
}
