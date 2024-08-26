const jwt = require('jsonwebtoken') //TODO : 😎

const tokenSign = async ({id_usuario, id_estado, id_rol}) => { //TODO: Genera Token
    return jwt.sign(
        {
            id_usuario: id_usuario, 
            id_rol: id_rol,
            id_estado: id_estado
        }, //TODO: Payload ! Carga útil
        process.env.JWT_SECRET, //TODO ENV 
        {
            expiresIn: "24h", //TODO tiempo de vida
        }
    );
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { //TODO: Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}



module.exports = {
    tokenSign,
    decodeSign,
    verifyToken
}