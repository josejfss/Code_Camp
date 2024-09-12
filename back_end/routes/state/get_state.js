const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');

//Configurar sequelize para sql server
const sequelize = require('../../base_datos/conexion_bd')

module.exports = (express,app) => {
    
	app.get('/get_state', upload.any(), async function(req,res){
        try {
                
            try {
                // Llamar al procedimiento almacenado para crear un estado
                const state = await sequelize.query(`SELECT * FROM estado;`);
    
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