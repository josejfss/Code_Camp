const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const { verifyToken } = require('../../encryption/jwt')

const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.put('/update_product_category', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try {    
            const { 
                id_estado,
                nombre,
                id_categoria_producto
            } = req.body;
            
            // Validar campos obligatorios
            if (!nombre || !id_categoria_producto || !id_estado) {
                return res.status(400).json({response_text:"Faltan campos obligatorio, reverificar NOMBRE, ID_CATEGORIA_PRODUCTO o ID_ESTADO"});
            }
            
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)

            try {
                // Llamar al procedimiento almacenado para crear un estado
                const state = await sequelize.query(`EXEC update_categoria_producto ${id_categoria_producto}, '${nombre}', ${id_estado}, '${id_usuario}';`);
                // if (state[0].row_aff === 0) {
                //     return res.status(400).json({response_text:"Error al crear estado"});
                // }
                return res.status(200).json({
                    "response_text":"Categoria estado ACTUALIZADO", 
                });
                
            }catch (error) {
                return res.status(400).json({response_text:error});
            }
        }catch (error) {
            return res.status(400).json({response_text:error});
        }

    });
}