const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const { verifyToken } = require('../../encryption/jwt')

const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.post('/create_state', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try{
            const { 
                nombre
            } = req.body;
            
            // Validar campos obligatorios
            if (!nombre) {
                return res.status(400).json({response_text:"Faltan campos obligatorio NOMBRE"});
            }
            
            //TODO: authorization: 
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)

            try {
                // Llamar al procedimiento almacenado para crear un estado
                const state = await sequelize.query(`EXEC insert_estado '${nombre}', ${id_usuario};`);

                return res.status(200).json({
                    "response_text":"Estado creado", 
                });
                
            }catch (error) {
                return res.status(400).json({response_text:error});
            }
        }catch (error) {
            return res.status(400).json({response_text:error});
        }

    });
}