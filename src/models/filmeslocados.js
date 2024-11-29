const database = require('../config/database') 
class ModelFilmeslocados {
    constructor() {
        this.model = database.db.define('filmeslocados',{
            id: {
                type:database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idFilme: {
                type:database.db.Sequelize.STRING
            },
            
            IdCliente: {
                type: database.db.Sequelize.STRING
            },
            dataLocacao: {
                type: database.db.Sequelize.STRING
            },
            dataDevolucao: {
                type: database.db.Sequelize.STRING
            }
        })
    }
}
module.exports = new ModelFilmeslocados().model