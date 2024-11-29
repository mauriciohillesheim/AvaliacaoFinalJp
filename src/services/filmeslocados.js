const ModelFilmeslocados = require('../models/filmeslocados')
const bcrypt = require ('bcrypt')
const SALT = 10
const jwt = require ('jsonwebtoken')

class ServiceFilmeslocados {
    async GetFilmeslocados() {
        return ModelFilmeslocados.findAll()
    }

    async CreateFilmeslocados(idFilme, idCliente, dataLocacao, dataDevolucao) {
        if (!idFilme || !idCliente || !dataLocacao || ! dataDevolucao){
            throw new Error("Favor preencher todos dados")
        }
        const hashSenha = await bcrypt.hash(idCliente, SALT)
        return ModelFilmeslocados.create({idFilme, idCliente: hashSenha, dataLocacao})
    }

    async UpdateFilmeslocados(id, idFilme, idCliente, dataLocacao, dataDevolucao) {
        if(!id ||!idFilme || !idCliente || !dataLocacao || ! dataDevolucao){
            throw new Error("Favor informar o id")
        }
        const filmeslocados = await ModelFilmeslocados.findByPk(id)
        if(!filmeslocados){
            throw new Error("Cliente não encontrada")
        }
        filmeslocados.idFilme = idFilme || filmeslocados.nome
        filmeslocados.idCliente = idCliente 
        ? await bcrypt.hash(idCliente, SALT)
        : filmeslocados.passwordS
        filmeslocados.dataLocacao = dataLocacao || filmeslocados.dataLocacao
        filmeslocados.dataDevolucao = dataDevolucao || filmeslocados.dataDevolucao

        filmeslocados.save()
        return filmeslocados
    }

    async DeleteFilmeslocados(id) {
        const filmeslocados = await ModelFilmeslocados.findByPk(id)
        if(!filmeslocados) {
        throw Error("Pessoa nao encontrada")
        }
        return filmeslocados.destroy({id})
    }

    async Login(senha, idCliente){
        if(!senha || !idCliente) {
            throw new Error ("Email ou senha invalido")
        }const filmeslocados = await ModelFilmeslocados.findOne({where: {idCliente}})
        if(!filmeslocados) {
            throw new Error ("EMAIL INVALIDO")
        }
        const senhaValida = brcypt.compare(senha, filmeslocados.senha)
        if(!senhaValida) { 
            throw new Error("senha ou senha invalido")
        }
        return jwt.sign({id: filmeslocados.id}, 'segredo', { expiresIn: 60 * 60})    
    }
}
module.exports = new ServiceFilmeslocados()