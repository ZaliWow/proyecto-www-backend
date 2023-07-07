const { send } = require('vite')
const pool = require('../database')
//obtener todas las canciones
const getAllsong = async (req, res) =>{
  try {
const result = await pool.query('SELECT * FROM public."canciones"')
res.json(result.rows)
  } catch (error) {
    res.send("error 201")
  }
   
}
//obtener una sola cancion
const getSong = async (req, res) =>{ 
try {
  const {id} = req.params
  const result = await pool.query('SELECT * FROM public."canciones" WHERE id_cancion = $1',[id])
  if(result.rows.length === 0) 
  return res.status(404).json({
    message : "song not found"
  })
res.json(result.rows)  
} catch (error) {
  console.log("hubo un error")
}  
}
//crear una sola cancion
const createSong = async (req, res) =>{
    const {
      id_cancion, 
      nombre_cancion,
      url_cancion, 
      artista_cancion} =req.body
      try {
        const result = await pool.query ('INSERT INTO public."canciones" (id_cancion, nombre_cancion, url_cancion, artista_cancion) VALUES ($1,$2,$3,$4) RETURNING *',
    [id_cancion,
      nombre_cancion,
      url_cancion,
      artista_cancion])
      res.send("cancion añadida")
      } catch (error) {
        console.log("no se pudo añador")
        res.send("paila")
      }
    
  }
//Elminar una sola cancion
const deleteSong = async (req, res) =>{
  try {
    const {id} = req.params
    const result = await pool.query('DELETE FROM public."canciones" WHERE id_cancion = $1', [id])
    if (result.rowCount === 0)
    return res.status(404).json({
      message: "song not found"
    })
    return res.sendStatus(204)
  } catch (error) {
    console.log(message.error)
  }
    
}  
//traer solo url de cancion
const urlSong = async(req, res) =>{
  try {
    const {id} =req.params
    const result = await pool.query('SELECT url_cancion FROM public."canciones" WHERE id_cancion = $1',[id])
    res.json(result.rows)
  } catch (error) {
    res.json("error 404")
  }
}
module.exports={ 
    getAllsong,
    getSong, 
    deleteSong,
    createSong,
    urlSong
}
