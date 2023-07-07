const {Router} = require('express')
const {
    getAllsong, 
    getSong, 
    deleteSong, 
    createSong,
urlSong}= require("../controllers/music_controllers")
const pool = require("../database")


const router = Router();
// obtener la lista de todas las canciones
router.get('/music', getAllsong)
// crear una cancion
router.post('/music', createSong)
//Eliminar una cancion
router.delete('/music/:id', deleteSong)
//retornar una sola cancion
router.get('/music/:id', getSong)
// retornar url de canciones
router.get('/music/url/:id', urlSong)
module.exports = router;