const e = require('express');
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
    
	app.post('/create_state', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        const { 
            nombre
         } = req.body;
        
        // Validar campos obligatorios
         if (!nombre) {
            return res.status(400).json({response_text:"Faltan campos obligatorio NOMBRE"});
        }
        

        try {
			// Llamar al procedimiento almacenado para crear un estado
			const state = await sequelize.query(`EXEC insert_estado '${nombre}'`);
            // if (state[0].row_aff === 0) {
            //     return res.status(400).json({response_text:"Error al crear estado"});
            // }
            return res.status(200).json({
                "response_text":"Estado creado", 
            });
			
		}catch (error) {
			console.error(error);
			return res.status(400).json({response_text:error});
		}

    });
}