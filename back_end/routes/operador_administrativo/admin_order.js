const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const { verifyToken } = require('../../encryption/jwt')
const config = require('../../config')

const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.put('/check_admin_order', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try {    
            const { 
                id_orden,
                estado = 0, // 0: Rechazado, 1: Aceptado
                descripcion = ""
            } = req.body;
            
            
            // Validar campos obligatorios
            if (!id_orden) {
                return res.status(400).json({response_text:"Faltan campos obligatorio"});
            }
            
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)

            try {

                if (estado === 0) {
                    // Llamar al procedimiento almacenado para crear un estado
                    const state1 = await sequelize.query(`EXEC rechazar_pedido ${id_orden}, ${config.estados['Orden_rechazada']}, ${id_usuario}, '${descripcion}';`);
                    return res.status(200).json({
                        "response_text":"Pedido  rechazado"
                    });
                // Llamar al procedimiento almacenado para crear un estado
                }else{
                    const state2 = await sequelize.query(`EXEC aceptar_pedido ${id_orden}, ${config.estados['Orden_confirmada']}, '${descripcion}', ${id_usuario};`);
                    return res.status(200).json({
                        "response_text":"Pedido  aceptado"
                    });
                    
                }
   
                
            }catch (error) {
                return res.status(400).json({response_text:error.message});
            }
        }catch (error) {
            return res.status(400).json({response_text:error});
        }

    });
}