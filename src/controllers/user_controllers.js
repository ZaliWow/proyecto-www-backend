const { send } = require('vite')
const pool = require('../database')

// para obtener todos los usuarios
const getAllUser = async(req, res) =>{
    try {
        const result = await pool.query('SELECT * FROM public."Usuarios"')
        res.json(result.rows)
    } catch (error) {
        res.send("error 404")
    }
}
// para obtener un solo usuario
const getUser = async(req, res) =>{
    const {id}= req.params
    const result =  await pool.query('SELECT * FROM public."Usuarios" WHERE id_usuario = $1',[id])
    if(result.rows.length === 0) 
    return res.status(404).json({
    message : "song not found"
  })
    res.json(result.rows)
}
//para crear un solo usuario
const createUser =async(req, res) =>{
    const {
        correo_usuario,
        contra_usuario,
        id_usuario
    } = req.body
    try {
        const result = await pool.query('INSERT INTO public."Usuarios" (correo_usuario, contra_usuario, id_usuario) VALUES ($1,$2,$3)',
    [
        correo_usuario, 
        contra_usuario, 
        id_usuario])
    res.send("usuario añadido")
    } catch (error) {
        res.send("paila mi perro")
        
    }
    
}

module.exports={
    getAllUser,
    getUser,
    createUser
}