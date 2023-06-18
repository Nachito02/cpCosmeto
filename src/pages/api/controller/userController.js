import { connectDB } from "../config/db";
import Cliente from "../models/Cliente";

export const getCliente = async (email) => {
    
    try {
        connectDB()
        const cliente = await Cliente.findOne({correo: email})
       
        return cliente
    } catch (error) {
        console.log(error)
    }

}

export const createCliente = async (token) => {
    connectDB()
    try {
    const {email , given_name, family_name, picture} = token
        const cliente = await Cliente.create({
            nombre: given_name,
            apellido: family_name,
            correo: email,
            password:generateRandomPassword(8),
            foto_perfil: picture,
        })
        return cliente
    } catch (error) {
        console.log(error)
    }

}

function generateRandomPassword(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
  }