const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');

//Configurar sequelize para sql server
const Sequelize = require('sequelize');
const sequelize = new Sequelize (process.env.DATABASE, 
    process.env.USER_DATABASE, 
    process.env.PASSWORD_USER_DATABASE, {
    host: process.env.HOST_DATABASE,
    dialect: 'mssql',
    port: process.env.PORT_DATABASE,
    dialectOptions: {
        options: {
            encrypt: true,
        }
    }
});


module.exports = (express,app) => {
    
	app.get('/get_product', checkAuth, upload.any(), async function(req,res){
        try {
                
            try {
                // Llamar al procedimiento almacenado para crear un estado
                const state = await sequelize.query(`SELECT * FROM producto;`);
                // actualizar el campo foto con la url de la imagen
                let datos = state[0].map(producto => ({
                    id_producto: producto.id_producto,
                    nombre: producto.nombre,
                    marca: producto.marca,
                    codigo: producto.codigo,
                    stock: producto.stock,
                    foto: process.env.URL_BUCKET + producto.foto,
                    precio: producto.precio,
                    id_estado: producto.id_estado,
                    id_categoria_producto: producto.id_categoria_producto,
                    id_usuario: producto.id_usuario,
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