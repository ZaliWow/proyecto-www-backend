const { send } = require('vite')
const pool = require('../database')
//para traer todo y hacer pruebas
const getALL = async(req, res) =>{
    const result = await pool.query('SELECT * FROM public."Lista_favoritos"')
    res.json(result.rows)
}
//para traer todas las canciones fav
const getAllFavs = async (req, res) =>{
    try {
        const {id}= req.params
        const result= await pool.query('SELECT * FROM public."Lista_favoritos" WHERE id_usuario = $1', [id])
        res.json(result.rows)
      //  if(result.rows.length === 0) 
        //return res.status(404).json({ 
        //message : "song not found"
      //})
        } catch (error) {
            res.send("status 404")
        }
    
}
// parar traer la id de las canciones favs
const getIdsSong = async (req, res) =>{
    try {
        const {id}= req.params
        const result = await pool.query ('SELECT id_cancion FROM public."Lista_favoritos" WHERE id_usuario =$1',[id])
        res.json(result.rows)
    } catch (error) {
        res.send("status 404")
    }
}
 
// para crear una relacion de fav

const createFavs = async (req, res) =>{
    const {
        id_usuario,
        id_cancion,
        id_favorito
    } = req.body
    try {
        const result = await pool.query('INSERT INTO public."Lista_favoritos" (id_usuario, id_cancion, id_favorito) VALUES ($1,$2,$3) RETURNING *',
        [   id_usuario,
            id_cancion,
            id_favorito])
        res.send("relacion creada")
    } catch (error) {
       res.send("no se ha podio")
    }
   
} 
 

//para eliminar de favoritos
 const deleteFavs= async (req, res) =>{
    try {
      const {id} = req.params
      const result = await pool.query('DELETE FROM public."Lista_favoritos" WHERE id_usuario = $1',[id] )
      if (result.rowCount === 0)
      return res.status(404).json({
        message: "song not found"
      })
      return res.sendStatus(204)
    } catch (error) {
        res.send("status 404")
    }
 }

module.exports={ 
    getAllFavs,
    createFavs,
    getALL,
    deleteFavs,
    getIdsSong
}