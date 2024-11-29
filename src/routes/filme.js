const express = require('express')
const ControllerFilme = require('../controllers/filme')
const auth = require ("../middleware/auth")
const router = express.Router()

router.post('/', ControllerFilme.CreateFilme)
router.get('/',auth,ControllerFilme.GetFilme)
router.put('/:id',auth, ControllerFilme.UpdateFilme)
router.delete('/:id',auth, ControllerFilme.DeleteFilme)

module.exports= router