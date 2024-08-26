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
    
	app.get('/get_state', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
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
                const state = await sequelize.query(`SELECT * FROM estado;`);
    
                console.log(state);
                return res.status(200).json({
                    "data" : state[0]
                });
                
            }catch (error) {
                console.error(error);
                return res.status(400).json({response_text:error});
            }
        }catch (error) {    
            console.error(error);
            return res.status(400).json({response_text:error});
        }
    });
}