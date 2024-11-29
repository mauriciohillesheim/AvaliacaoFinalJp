const express = require('express')
const routesCliente = require("./src/routes/cliente") 
const routesFilme  = require("./src/routes/filme")
const routesFilmeslocados = require ("./src/routes/filmeslocados")
const database = require('./src/config/database')

const app= express()
app.use(express.json())

app.use('/clientes',routesCliente)
app.use('/filme',routesFilme)
app.use('/filmeslocados',routesFilmeslocados)

const PORT=3000

database.db
  .sync({ force: false })
  .then((_)  => {
    console.info("Banco conectado com sucesso")

    app.listen(PORT, ( )=> { 
      console.info(`Servidor rodando a porta ${PORT}`)
    })
  })
  .catch((e) =>{
    console.error('Conexão falhou ${e}')
  })