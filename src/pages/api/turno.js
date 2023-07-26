import { isAvailableHour } from "./controller/turnoController"

export default async function handler(req,res) {

    if(req.method !=='GET' && req.method !== 'POST') {
        console.log('entrando')

        return res.status(405).end()
    }


    //consultar disponibilidad 
    if(req.method === 'GET') {

        const horarios = await isAvailableHour()

        res.json(horarios)

    }

    //crear el turno
    if(req.method === 'POST') {



    }
}