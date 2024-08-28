const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const { verifyToken } = require('../../encryption/jwt')


require('dotenv').config();

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
    
	app.put('/update_orden', checkAuth, upload.any(), async function(req,res){
        try{
            const { 
                fecha_entrega,
                id_orden,
                departamento,
                municipio,
                zona,
                complemento_direccion,
                nombre = "",
                apellido = "",
                correo_electronico = "",
                telefono = "",               
            } = req.body;
            
            // Validar campos obligatorios
            if (!fecha_entrega || !id_orden || !departamento || !municipio || !zona || !complemento_direccion) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            }
                        ;
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)
            //Validad si viene archivo en files
            
            try {
                // Llamar al procedimiento almacenado para crear un producto
                const state = await sequelize.query(`EXEC update_orden '${fecha_entrega}', 
                    ${id_orden}, '${departamento}', '${municipio}', '${zona}', '${complemento_direccion}', '${nombre}', '${apellido}', '${correo_electronico}', '${telefono}', ${id_usuario}`);

                return res.status(200).json({
                    "response_text": "Orden actualizado", 
                });
            }catch (error) {
                console.log(error)
                return res.status(400).json({response_text:error});
            }
        }catch (error) {
            console.log(error)
            return res.status(400).json({response_text:error});
        }

    });
}