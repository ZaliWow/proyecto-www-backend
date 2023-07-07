const {Pool}= require('pg')
const pool = new Pool({
    user: 'postgres',
    password: "6969",
    host:"localhost",
    port:5432,
    database:"Proyect_WWW"
})
module.exports = pool;