
const Router= require('express')

const {
    getAllUser,
    getUser,
    createUser
}= require("../controllers/user_controllers")

const router = Router();
//Ruta para mostrar todos los usuarios
router.get('/user', getAllUser)
//Ruta para mostrar un usuario
router.get('/user/:id',getUser)
//Ruta para crear un usuario
router.post('/user',createUser)
module.exports=router;