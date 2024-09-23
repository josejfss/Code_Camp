const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const config = require('../../config')

const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.get('/get_orders', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try {
        // const { 
        //     id_estado,
        //     nombre
        //  } = req.body;
        
        // // Validar campos obligatorios
        //  if (!nombre) {
        //     return res.status(400).json({response_text:"Faltan campos obligatorio NOMBRE"});
        // }
                
            try {
                // Llamar al procedimiento almacenado para crear un estado
                const state = await sequelize.query(`select o.id_orden,
	o.complemento_direccion + ', zona ' + o.zona +', ' + o.municipio + ', ' + o.departamento direccion,
	CONVERT(varchar,o.fecha_entrega,3) fecha_entrega,
	o.fecha_creacion,
	o.total_orden,
	e.nombre estado,
    o.nombre + ' ' + o.apellido nombre_completo
from orden o
inner join estado e on e.id_estado = o.id_estado
where o.id_estado = ${config.estados['En_proceso']};`);
    
                return res.status(200).json({
                    "data" : state[0]
                });
                
            }catch (error) {
                return res.status(400).json({response_text:error.message});
            }
        }catch (error) {    
            return res.status(400).json({response_text:error});
        }
    });
}