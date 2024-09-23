const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const config = require('../../config')

const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.get('/get_orders_admin', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try {

                
            try {
                let query = `select o.id_orden,
	o.complemento_direccion + ' ' + o.zona +', ' + o.municipio + ', ' + o.departamento direccion,
	CONVERT(varchar,o.fecha_entrega,3) fecha_entrega,
	CONVERT(varchar,o.fecha_creacion,3) fecha_creacion,
	o.total_orden,
	e.nombre estado,
    e.id_estado,
    o.departamento,
    o.municipio,
    o.complemento_direccion,
    o.zona,
    o.nombre,
    o.apellido,
    o.correo_electronico,
    CONVERT(varchar,o.fecha_entrega,23) fecha_entrega2,
    o.telefono,
    o.nombre + ' ' + o.apellido nombre_completo
from orden o
inner join estado e on e.id_estado = o.id_estado`;
                const state = await sequelize.query(query);
    
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