const jwt = require('jsonwebtoken')
function auth(req, res, next) {
    console.log('estou no middleware')    
    const token = req.headers['authorization']

    if (!token) {
        return res.status(400).send({ msg: "Token não autorizado" })
    }

    jwt.verify(token, "segredo", (err, decoded) => {
        if (err) {
            console.error('Erro ao decodificar', err)
            return res.status(400).send({ msg: "Token não autorizado" })
        }

        console.log(decoded)
        next()
    })
}
module.exports = auth;