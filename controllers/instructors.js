const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')


//INDEX
exports.index = function(req, res){



  return res.render("instructors/index", {instructors: data.instructors})
}

//Create
  exports.create = function(req, res){
    return res.render("instructors/create")
  }


//POST
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
      if(err) return res.send("write fail erro") 
        return res.redirect(`/instructors/${id}`)
      
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

//Edit = apenas página para editar

exports.edit = function(req, res){

  const {id} = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })
  if(!foundInstructor ) return res.send("instrutor não existe")

  const instructor = {
    ...foundInstructor,
    birth:date(foundInstructor.birth).iso
  }


  

  return res.render("instructors/edit", {instructor})
}

//Update = put

exports.put = function(req,res) {
  //Buscando dados do corpo do arquivo
  const {id} = req.body

  let index = 0

  const foundInstructor = data.instructors.find(function(instructor, foundIndex){
    instructor.id 

    if( id == instructor.id) {
      index = foundIndex
      return true
    }
  })
  if(!foundInstructor ) return res.send("instrutor não existe")

  const instructor = {
        ...foundInstructor,
        ...req.body,
         birth:Date.parse(req.body.birth),
         id: Number(req.body.id)
  }

  data.instructors[index] = instructor

  fs.writeFile("data.json", JSON.stringify(data, null,4), function(err){
    if(err) return res.send("write fail erro") 

      return res.redirect(`/instructors/${id}`)
    
} )

}


//Delete

exports.delete = function(req, res) {
  const {id} = req.body

  const filteredInstructors = data.instructors.filter(function(instructor){
    //O que significa ser diferente desse id?
    return instructor.id != id
  })

  data.instructors = filteredInstructors

  fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
    if(err) return res.send("write fail erro")
    return res.redirect(`/instructors`)
  })
}