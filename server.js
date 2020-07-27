//fazendo o require do express
const express = require('express')

//Template Engines
const nunjucks = require('nunjucks')

//Chamando a routes
const routes = require('./routes')

//colocando o express no server
const server = express()


//Configurando o express para arquivos estáticos
server.use(express.static('public'))

//Responsavel por fazer funcionar o req.body
server.use(express.urlencoded({extended:true}))

server.use(routes)

server.set("view engine","njk")

nunjucks.configure("views", {
  express:server,
  autoescape:false,
  noCache:true
})


//Criando a porta do servidor
server.listen(3000, function(){
  console.log('Server is running!')
})
