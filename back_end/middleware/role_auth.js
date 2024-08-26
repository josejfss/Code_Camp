
const { verifyToken } = require('../encryption/jwt')

const check_role_auth = (role) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop() //TODO: 231231321
        const {id_rol} = await verifyToken(token)
        

        
        if (id_rol === role) { //TODO:
            next()
        } else {
            res.status(403)
            res.send({ response_text: 'No tienes permiso para acceder' })
        }

    } catch (e) {
        // console.log(e)
        res.status(401)
        res.send({ response_text: 'No tienes acceso para ingresar' })
    }

}

module.exports = check_role_auth;