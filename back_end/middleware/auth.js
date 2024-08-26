
const { verifyToken } = require('../encryption/jwt')

const checkAuth = async (req, res, next) => {
    try {
        //TODO: authorization: 
        const token = req.headers.authorization.split(' ').pop() //TODO:123123213
        const tokenData = await verifyToken(token)
        if (tokenData.id_usuario) {
            next()
        } else {
            res.status(401)
            res.send({ response_text: 'No tienes permisos para ingresar' })
        }

    } catch (e) {
        // console.log(e)
        res.status(401)
        res.send({ response_text: 'No tienes permisos para ingresar' })
    }

}

module.exports = checkAuth