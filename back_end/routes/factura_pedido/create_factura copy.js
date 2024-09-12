const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const { verifyToken } = require('../../encryption/jwt')
const config = require('../../config')
const sequelize = require('../../base_datos/conexion_bd');
const { QueryTypes } = require('sequelize');
require('dotenv').config();


module.exports = (express,app) => {
    
	app.post('/create_factura_p2', checkAuth, upload.any(), async function(req,res){
        try{
            const { 
                departamento,
                municipio,
                zona,
                complemento_direccion,
                fecha_entrega,
                id_estado = config.estados["En_proceso"],
                detalle_orden,
                telefono = "",
                correo_electronico = "",
                nombre = "",
                apellido = ""
            } = req.body;
            
            // Validar campos obligatorios
            if (!departamento || !municipio || !complemento_direccion || !fecha_entrega || !detalle_orden) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            }
            console.log(detalle_orden);
            const nuevo_detalle = JSON.stringify(detalle_orden);
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)

            
            try {
                 let query = `EXEC crear_pedido_2 '${departamento}',
                '${municipio}',
                '${zona}', 
                '${complemento_direccion}',
                '${fecha_entrega}',
                ${id_usuario},
                ${id_estado},
                :orden_detalle,
                '${telefono}',
                '${correo_electronico}',
                '${nombre}',
                '${apellido}'`;

                console.log(query);
                // Llamar al procedimiento almacenado para crear un producto
                const factura_p = await sequelize.query(`${query}`, {
                    replacements: {
                        orden_detalle: nuevo_detalle
                    },
                    type: QueryTypes.RAW
                });

                return res.status(200).json({
                    "response_text": "Factura creada exitosamente", 
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