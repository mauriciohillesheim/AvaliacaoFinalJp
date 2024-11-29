const ServiceFilme = require('../services/filme')
class ControllerFilme {
   async GetFilme(req, res) {
      try {
         const filmes = await ServiceFilme.GetFilmes()
         res.send({ msg: filmes })
      } catch (error) {
         res.status(500).send({ msg: error.message })
      }
   }

   async CreateFilme(req, res) {
      try {
         const { titulo, faixaetaria, diretor } = req.body
         const filme = await ServiceFilme.CreateFilme(titulo, faixaetaria, diretor)
         res.send({ msg: filme })

      } catch (error) {       
         res.status(500).send({ msg: error.message })
      }
   }

   async UpdateFilme(req, res) {
      try {
         const id = req.params.id
         const titulo = req.body.titulo
         const faixaetaria = req.body.faixaetaria
         const diretor = req.body.diretor
         const filmes = await ServiceFilme.UpdateFilme(id, titulo, faixaetaria, diretor)
         res.send({ msg: filmes })

      } catch (error) {
         res.status(500).send({ msg: error.message })
      }
   }

   async DeleteFilme(req, res) {
      try {
         const id = req.params.id
         await ServiceFilme.DeleteCliente(id)
         res.status(204).send()

      } catch (error) {
         res.status(500).send({ msg: error.message })
      }
   } 
}
module.exports = new ControllerFilme()