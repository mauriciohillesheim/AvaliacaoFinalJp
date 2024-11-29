const ServiceCliente = require('../services/cliente')
class ControllerCliente {
 
   async GetCliente(req, res) {      
      try {
         const clientes = await ServiceCliente.GetClientes()
         res.send({ msg: clientes })
      } catch (error) {
         res.status(500).send({ msg: error.message })
      }
   }

   async CreateCliente(req, res) {
      try {
         const { nome, email, senha } = req.body
         const cliente = await ServiceCliente.CreateCliente(nome, email, senha)
         res.send({ msg: cliente })
      } catch (error) {
         res.status(500).send({ msg: error.message })
      }
   }

   async UpdateCliente(req, res) {
      try {
         const id = req.params.id
         const nome = req.body.nome
         const email = req.body.email
         const senha = req.body.senha
         const clientes = await ServiceCliente.UpdateCliente(id, nome, email, senha)
         res.send({ msg: clientes })

      } catch (error) {
         res.status(500).send({ msg: error.message })
      }
   }

   async DeleteCliente(req, res) {
      try {
         const id = req.params.id
         await ServiceCliente.DeleteCliente(id)
         res.status(204).send()
      } catch (error) {
         res.status(500).send({ msg: error.message })
      }
   }

   async Login(req,res){
      try {
         const { senha, email} = req.body
         const token = await ServiceCliente.Login(senha, email)
         res.status(200).send({token})
      } 
      catch (error){
         res.status(500).send({ msg: error.message})      
      } 
   }
}
module.exports = new ControllerCliente()