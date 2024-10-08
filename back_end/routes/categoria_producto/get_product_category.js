const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');

const sequelize = require('../../base_datos/conexion_bd')
const {estados} = require('../../config')

module.exports = (express,app) => {
    
	app.get('/get_product_category', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try {
                
            try {
                // Query  para obtener la categoria de productos
                const data = await sequelize.query(`SELECT id_categoria_producto, nombre, id_estado FROM categoria_producto where id_estado = ${estados.Activo};`);
    
                return res.status(200).json({
                    "data" : data[0]
                });
                
            }catch (error) {
                return res.status(400).json({response_text:error});
            }
        }catch (error) {    
            return res.status(400).json({response_text:error});
        }
    });
}