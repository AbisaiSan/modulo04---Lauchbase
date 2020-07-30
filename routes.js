const express = require('express')
//Variavel responsavel pelas rotas
const routes = express.Router()
//Chamando arquivo instructors com as funções (CRUD)
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')


routes.get('/', function(req, res){
  return res.redirect("/instructors")
})


routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id/edit', instructors.edit )
routes.get('/instructors/:id', instructors.show)
//Recebendo a requisição via post do corpo
routes.post('/instructors', instructors.post)
//Recebendo dados para update
routes.put('/instructors', instructors.put)
// rota para deletar dados
routes.delete('/instructors', instructors.delete)


routes.get('/members', members.index)
routes.get('/members/create', members.create)
routes.get('/members/:id/edit', members.edit )
routes.get('/members/:id', members.show)
//Recebendo a requisição via post do corpo
routes.post('/members', members.post)
//Recebendo dados para update
routes.put('/members', members.put)
// rota para deletar dados
routes.delete('/members', members.delete)


//Exportando o arquivo
module.exports = routes

