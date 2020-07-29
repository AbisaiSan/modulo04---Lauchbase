const express = require('express')

//Variavel responsavel pelas rotas
const routes = express.Router()
//Chamando arquivo instructors com as funções (CRUD)
const instructors = require('./instructors')

routes.get('/', function(req, res){
  return res.redirect("/instructors")
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', function(req, res){
  return res.render("instructors/create")
})

routes.get('/instructors/:id/edit', instructors.edit )

routes.get('/instructors/:id', instructors.show)

//Recebendo a requisição via post do corpo
routes.post('/instructors', instructors.post)
//Recebendo dados para update
routes.put('/instructors', instructors.put)

// rota para deletar dados
routes.delete('/instructors', instructors.delete)

routes.get('/members', function(req, res){
  return res.send("/members")
})

//Exportando o arquivo
module.exports = routes

