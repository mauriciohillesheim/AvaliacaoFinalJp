const express = require('express')
const ControllerFilmeslocados = require('../controllers/filmeslocados')
const auth = require ("../middleware/auth")
const router = express.Router()

router.post('/', ControllerFilmeslocados.CreateFilmeslocados)
router.post('/login', ControllerFilmeslocados.Login)
router.get('/',auth,ControllerFilmeslocados.GetFilmeslocados)
router.put('/:id',auth, ControllerFilmeslocados.UpdateFilmeslocados)
router.delete('/:id',auth, ControllerFilmeslocados.DeleteFilmeslocados)

module.exports= router