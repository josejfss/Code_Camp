const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const {estados} = require('../../config')
const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.get('/get_product', upload.any(), async function(req,res){
        try {
                
            try {
                // Llamar al procedimiento almacenado para crear un estado
                const state = await sequelize.query(`SELECT p.id_producto, p.nombre, p.marca, p.codigo, p.stock, p.foto, p.precio, e.nombre estado FROM producto p
                    INNER JOIN estado e ON p.id_estado = e.id_estado
                    WHERE p.id_estado <> ${estados.Eliminado}
                    ;`);
                // actualizar el campo foto con la url de la imagen
                let datos = state[0].map(producto => ({
                    id_producto: producto.id_producto,
                    nombre: producto.nombre,
                    marca: producto.marca,
                    codigo: producto.codigo,
                    stock: producto.stock,
                    foto: process.env.URL_BUCKET + producto.foto,
                    precio: producto.precio,
                    estado: producto.estado
                  }));
                return res.status(200).json({
                    "data" : datos
                });
                
            }catch (error) {
                return res.status(400).json({response_text:error});
            }
        }catch (error) {    
            return res.status(400).json({response_text:error});
        }
    });
}