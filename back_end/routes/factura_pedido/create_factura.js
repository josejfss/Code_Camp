const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const { verifyToken } = require('../../encryption/jwt')
const config = require('../../config')
const sequelize = require('../../base_datos/conexion_bd')
require('dotenv').config();


module.exports = (express,app) => {
    
	app.post('/create_factura_p', checkAuth, upload.any(), async function(req,res){
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
            if (!departamento || !municipio || !zona || !complemento_direccion || !fecha_entrega || !detalle_orden) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            }
                        ;
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)

            
            try {
                let query = `DECLARE @detalle_orden AS tipo_detalle_orden;
                INSERT INTO @detalle_orden (id_producto, cantidad, precio)
                VALUES`;

                //Hacemos la query de detalle_orden
                for(let i = 0; i < detalle_orden.length; i++){
                    if(i == detalle_orden.length - 1){
                        query += `(${detalle_orden[i].id_producto}, ${detalle_orden[i].cantidad}, ${detalle_orden[i].precio});\n`
                    }else{
                        query += `(${detalle_orden[i].id_producto}, ${detalle_orden[i].cantidad}, ${detalle_orden[i].precio}),\n`
                    }
                }


                query += `EXEC crear_pedido '${departamento}',
                '${municipio}',
                '${zona}', 
                '${complemento_direccion}',
                '${fecha_entrega}',
                ${id_usuario},
                ${id_estado},
                @detalle_orden,
                '${telefono}',
                '${correo_electronico}',
                '${nombre}',
                '${apellido}';
                `;
                // Llamar al procedimiento almacenado para crear un producto
                const factura_p = await sequelize.query(`${query}`);
                return res.status(200).json({
                    "response_text": "Factura creada exitosamente", 
                });
            }catch (error) {
                return res.status(400).json({response_text:error});
            }
        }catch (error) {
            return res.status(400).json({response_text:error});
        }

    });
}