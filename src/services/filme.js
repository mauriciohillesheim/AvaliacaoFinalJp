const ModelFilme = require('../models/filme')
const bcrypt = require ('bcrypt')
const SALT = 10
const jwt = require ('jsonwebtoken')

class ServiceFilme {
    async GetFilme() {
        return ModelFilme.findAll()
    }

    async CreateFilme(titulo, faixaetaria, diretor) {

        if (!titulo || !faixaetaria || !diretor){

            throw new Error("Favor preencher todos dados")
        }        
        const hashSenha = await bcrypt.hash(faixaetaria, SALT)
        return ModelFilme.create({titulo, faixaetaria: hashSenha, diretor})
    }

    async UpdateFilme(id, titulo, faixaetaria, diretor) {
    if(!id ||!titulo || !faixaetaria || !diretor){
        throw new Error("Favor informar o id")
    }
    const filme = await ModelFilme.findByPk(id)
    if(!filme){
        throw new Error("Cliente não encontrada")
    }
      filme.titulo = titulo || filme.titulo
      filme.faixaetaria = faixaetaria 
      ? await bcrypt.hash(faixaetaria, SALT)
      : filme.passwordS
      filme.diretor = diretor || filme.diretor
      filme.save()
      return filme
    }

    async DeleteCliente(id) {
        const filme = await ModelFilme.findByPk(id)
        if(!filme) {
        throw Error("Filme  nao encontrado")
        }
        return filme.destroy({id})
    }
}
module.exports = new ServiceFilme()