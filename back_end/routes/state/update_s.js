const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const { verifyToken } = require('../../encryption/jwt')

const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.put('/update_state', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try {    
            const { 
                id_estado,
                nombre
            } = req.body;
            
            // Validar campos obligatorios
            if (!nombre) {
                return res.status(400).json({response_text:"Faltan campos obligatorio NOMBRE"});
            }
            
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)

            try {
                // Llamar al procedimiento almacenado para crear un estado
                const state = await sequelize.query(`EXEC update_estado ${id_estado}, '${nombre}', '${id_usuario}';`);
                return res.status(200).json({
                    "response_text":"Estado Actualizado", 
                });
                
            }catch (error) {
                return res.status(400).json({response_text:error});
            }
        }catch (error) {
            return res.status(400).json({response_text:error});
        }

    });
}