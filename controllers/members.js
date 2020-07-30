const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')


//INDEX
exports.index = function(req, res){



  return res.render("members/index", {members: data.members})
}

//SHOWS
exports.show = function(req, res){
  const {id} = req.params

  const foundMember = data.members.find(function(member){
    return member.id == id
  })
  if(!foundMember ) return res.send("Membro não existe")

  const member = {
    ...foundMember,
    age: age(foundMember.birth)
  }

  return res.render("members/show", {member})
}

//Create
exports.create = function(req, res){
  return res.render("members/create")
}

//Post
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

  const id = Number(data.members.length + 1)
  //Criando uma chave dentro do arquivo data.json
  //E passando os dados do req.body 
  data.members.push({
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
        return res.redirect('/members')
      
  } )

  //return res.send(req.body)
}

//Edit = apenas página para editar
exports.edit = function(req, res){

  const {id} = req.params

  const foundMember = data.members.find(function(member){
    return member.id == id
  })
  if(!foundMember ) return res.send("Membro não existe")

  const member = {
    ...foundMember,
    birth:date(foundMember.birth)
  }


  

  return res.render("members/edit", {member})
}

//Update = put
exports.put = function(req,res) {
  //Buscando dados do corpo do arquivo
  const {id} = req.body

  let index = 0

  const foundMember = data.members.find(function(member, foundIndex){
    member.id 

    if( id == member.id) {
      index = foundIndex
      return true
    }
  })
  if(!foundMember ) return res.send("Membro não existe")

  const member = {
        ...foundMember,
        ...req.body,
         birth:Date.parse(req.body.birth),
         id: Number(req.body.id)
  }

  data.members[index] = member

  fs.writeFile("data.json", JSON.stringify(data, null,4), function(err){
    if(err) return res.send("write fail erro") 

      return res.redirect(`/members/${id}`)
    
} )

}

//Delete
exports.delete = function(req, res) {
  const {id} = req.body

  const filteredMembers = data.members.filter(function(member){
    //O que significa ser diferente desse id?
    return member.id != id
  })

  data.members = filteredMembers

  fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
    if(err) return res.send("write fail erro")
    return res.redirect(`/members`)
  })
}