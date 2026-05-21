const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const conexao = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"123456",
    database:"escola",
    port: 3306
})

conexao.connect((erro)=>{
    if(erro){
        console.log("Erro", erro)
    } else{
        console.log("MySQL conectado")
    }
})

app.listen(3001,()=>{
    console.log("Servidor rodando")
})
