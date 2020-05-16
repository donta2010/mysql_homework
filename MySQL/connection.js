const mysql =require("mysql");
let connection = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:process.env.DB_PASS,
    database:"MySQL_Homework"
})
module.exports=connection;