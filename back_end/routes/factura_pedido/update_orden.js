const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const { verifyToken } = require('../../encryption/jwt')


require('dotenv').config();

const sequelize = require('../../base_datos/conexion_bd')

module.exports = (express,app) => {
    
	app.put('/update_orden', checkAuth, upload.any(), async function(req,res){
        try{
            const { 
                fecha_entrega,
                id_orden,
                departamento,
                municipio,
                zona,
                complemento_direccion,
                nombre = "",
                apellido = "",
                correo_electronico = "",
                telefono = "",               
            } = req.body;
            
            // Validar campos obligatorios
            if (!fecha_entrega || !id_orden || !departamento || !municipio || !zona || !complemento_direccion) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            }
                        ;
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)
            
            
            try {
                // Llamar al procedimiento almacenado para crear un producto
                const state = await sequelize.query(`EXEC update_orden '${fecha_entrega}', 
                    ${id_orden}, '${departamento}', '${municipio}', '${zona}', '${complemento_direccion}', '${nombre}', '${apellido}', '${correo_electronico}', '${telefono}', ${id_usuario}`);

                return res.status(200).json({
                    "response_text": "Orden actualizado", 
                });
            }catch (error) {
                return res.status(400).json({response_text:error.message});
            }
        }catch (error) {
            return res.status(400).json({response_text:error});
        }

    });
}