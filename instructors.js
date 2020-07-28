const fs = require('fs')
const data = require('./data.json')
const {age} = require('./utils')

//Create

//Validação de dados

exports.post = function(req, res){

  const keys = Object.keys(req.body)

  for( key of keys) {
    if( req.body[key] == "") {
      return res.send("Preencha todos os campos!")
    }
  }

  //gerando o arquivo json, usando o JSON para transformar
  //Em um arquivo Jsos, e está recebendo os dados do req.body
  //Criando callback caso dê algum problema no sistema/app
  //usada Para não bloquear o app/sistem, assim continua rodando normal
  //Ai ele roda a callback Function


  let {avatar_url, name, services, gender, birth,} = req.body
  //vai pegar o birth e trasnformar em milisegundos
  birth = Date.parse(birth)

  //Pegando o dado da data de cadastro no sistema
  //Pega a data do momento em que esta sendo salvo
  const created_at = Date.now()

  const id = Number(data.instructors.length + 1)
  //Criando uma chave dentro do arquivo data.json
  //E passando os dados do req.body 
  data.instructors.push({
    id, 
    avatar_url, 
    name, 
    birth,
    gender, 
    services, 
    created_at
  })

  

  fs.writeFile("data.json", JSON.stringify(data, null,4), function(err){
      if(err) return res.send("Erro de escrita") 
        return res.redirect('/instructors')
      
  } )

  //return res.send(req.body)
}

//SHOWS
exports.show = function(req, res){
  const {id} = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })
  if(!foundInstructor ) return res.send("instrutor não existe")

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services:foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("en-GB").format(foundInstructor.created_at)
  }

  return res.render("instructors/show", {instructor})
}

//Update

exports.edit = function(req, res){

  const {id} = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })
  if(!foundInstructor ) return res.send("instrutor não existe")

  return res.render("instructors/edit", {instructor: foundInstructor})
}

//Delete