const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {estados} = require('../../config')
const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.get('/get_product2', upload.any(), async function(req,res){
        try {
                
            try {
                // Llamar al procedimiento almacenado para crear un estado
                const state = await sequelize.query(`SELECT p.id_producto, p.nombre, p.marca, p.codigo, p.stock, '${process.env.URL_BUCKET}' + p.foto foto, p.precio, e.nombre estado, cp.id_categoria_producto FROM producto p
                    INNER JOIN estado e ON p.id_estado = e.id_estado
                    INNER JOIN categoria_producto cp ON p.id_categoria_producto = cp.id_categoria_producto
                    WHERE p.id_estado <> ${estados.Eliminado}
                    ;`);
                return res.status(200).json({
                    "data" : state[0]
                });
                
            }catch (error) {
                return res.status(400).json({response_text:error});
            }
        }catch (error) {    
            return res.status(400).json({response_text:error});
        }
    });
}