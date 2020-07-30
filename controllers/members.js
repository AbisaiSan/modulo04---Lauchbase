const fs = require('fs')
const data = require('../data.json')
const {age, date} = require('../utils')


//INDEX
exports.index = function(req, res){



  return res.render("members/index", {members: data.members})
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


  //vai pegar o birth e trasnformar em milisegundos
  birth = Date.parse(req.body.birth)
  
  let id = 1
  const lastmember = data.members[data.members.length - 1]
  
  if(lastmember) {
    id = lastmember.id + 1
  }

  //Criando uma chave dentro do arquivo data.json
  //E passando os dados do req.body 
  data.members.push({
    ...req.body,
    id, 
    birth
  })

  

  fs.writeFile("data.json", JSON.stringify(data, null,4), function(err){
      if(err) return res.send("write fail erro") 
        return res.redirect(`/members/${id}`)
      
  } )

  //return res.send(req.body)
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
    birth: date(foundMember.birth).birthDay
  }

  return res.render("members/show", {member})
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
    birth:date(foundMember.birth).iso
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