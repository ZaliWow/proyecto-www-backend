const Router = require('express')
const {
    getAllFavs, 
    createFavs,
    getALL,
    deleteFavs,
    getIdsSong 
} = require('../controllers/favs_controllers')
const pool = require("../database")
const router = Router();
//para llamar todas las canciones favs de un usuario
router.get('/favs/:id', getAllFavs) 
// para la lista de las id canciones
router.get('/favs/ids/:id', getIdsSong)
//para crear una relacion de favs
router.post('/favs',createFavs)
//pa traer todo
router.get('/favs',getALL)
//para eliminar de favoritos
router.delete('/favs/:id', deleteFavs)



module.exports=router;