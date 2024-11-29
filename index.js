const express = require('express')
const routesCliente = require("./src/routes/cliente") 
const routesFilme  = require("./src/routes/filme")
const routesFilmeslocados = require ("./src/routes/filmeslocados")
const database = require('./src/config/database')
// instaciar um express

const app= express()

//middleware json - aceita json no body
app.use(express.json())

// Adicionar as rotas ao express
app.use('/clientes',routesCliente)
app.use('/filme',routesFilme)
app.use('/filmeslocados',routesFilmeslocados)

const PORT=3000

//conexão com banco de dados;
database.db 
  .sync({ force: false })
  .then((_)  => {
    console.info("Banco conectado com sucesso")

    app.listen(PORT, ( )=> { //usando o template screnn
      console.info(`Servidor rodando a porta ${PORT}`)
    })
  })
  .catch((e) =>{
    console.error('Conexão falhou ${e}')
  })
