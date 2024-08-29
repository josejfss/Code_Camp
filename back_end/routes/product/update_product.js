const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const { verifyToken } = require('../../encryption/jwt')


require('dotenv').config();
const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.put('/update_product', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try{
            const { 
                id_producto,
                nombre,
                marca,
                codigo,
                stock,
                precio,
                id_estado,
                id_categoria_producto                
            } = req.body;
            
            // Validar campos obligatorios
            if (!nombre || !marca || !codigo || !id_estado || !id_categoria_producto || !precio || !stock || !id_producto) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            }
                        ;
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)
            //Validad si viene archivo en files
            
            try {
                // Llamar al procedimiento almacenado para crear un producto
                const state = await sequelize.query(`EXEC update_producto ${id_producto},
                                                                            '${nombre}', 
                                                                            '${marca}', 
                                                                            '${codigo}', 
                                                                            ${stock},
                                                                            ${precio}, 
                                                                            ${id_estado}, 
                                                                            ${id_categoria_producto},
                                                                            ${id_usuario};`
                                                                        );
                // if (state[0].row_aff === 0) {
                //     return res.status(400).json({response_text:"Error al crear estado"});
                // }
                return res.status(200).json({
                    "response_text": "Producto actualizado", 
                });
            }catch (error) {
                console.log(error)
                return res.status(400).json({response_text:error});
            }
        }catch (error) {
            console.log(error)
            return res.status(400).json({response_text:error});
        }

    });
}