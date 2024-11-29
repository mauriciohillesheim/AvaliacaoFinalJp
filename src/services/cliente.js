const ModelCliente = require('../models/cliente')
const bcrypt = require ('bcrypt')
const SALT = 10
const jwt = require ('jsonwebtoken')

class ServiceCliente {
    async GetClientes() {
        return ModelCliente.findAll()
    }

    async CreateCliente(nome, email, senha) {
        if (!nome || !email || !senha){
            throw new Error("Favor preencher todos dados")
        }

        const hashSenha = await bcrypt.hash(email, SALT)
        return ModelCliente.create({nome, email: hashSenha, senha})
    }

    async UpdateCliente(id, nome, email, senha) {
    if(!id ||!nome || !email || !senha){
        throw new Error("Favor informar o id")
    }
    const cliente = await ModelCliente.findByPk(id)
    if(!cliente){
        throw new Error("Cliente não encontrada")
    }
        cliente.nome = nome || cliente.nome
        cliente.email = email 
        ? await bcrypt.hash(email, SALT)
        : cliente.passwordS
        cliente.senha = senha || cliente.senha

        cliente.save()
        return cliente
    }

    async DeleteCliente(id) {
        const cliente = await ModelCliente.findByPk(id)
        if(!cliente) {
        throw Error("Pessoa nao encontrada")
        }
        return cliente.destroy({id})
    }

    async Login(senha, email){
        if(!senha || !email) {
            throw new Error ("Email ou senha invalido")
        }const cliente = await ModelCliente.findOne({where: {email}})

        if(!cliente) {
            throw new Error ("EMAIL INVALIDO")
        }

        const senhaValida = brcypt.compare(senha, cliente.senha)
        if(!senhaValida) { 
            throw new Error("senha ou senha invalido")
        }

        return jwt.sign({id: pessoa.id}, 'segredo', { expiresIn: 60 * 60})   
    }
}
module.exports = new ServiceCliente()