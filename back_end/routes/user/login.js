const {encriptar} = require('../../encryption/encriptar')
const {tokenSign} = require('../../encryption/jwt')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

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
    
	app.post('/login',upload.any(), async function(req,res){
        const { 
            correo_electronico, 
            contrasena
         } = req.body;
        
        // Validar campos obligatorios
         if (!correo_electronico || !contrasena) {
            return res.status(400).json({response_text:"Faltan campos obligatorios"});
        }
        
        const password_hash = await encriptar(contrasena);

        try {
			// Buscar al usuario
			const usuario = await sequelize.query(`SELECT * FROM usuario WHERE correo_electronico = '${correo_electronico}' AND contrasena = '${password_hash}'`);
			if (usuario[0].length === 0) {
				return res.status(400).json({response_text:"Usuario o contraseña incorrectos"});
			}
			// Generar token
			const {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, id_rol, id_estado} = usuario[0][0];
			const token = await tokenSign(usuario[0][0]);
			return res.status(200).json({
				"response_text":"Usuario autenticado", 
				"token_jwr": token,
				"nombre_completo": `${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`,
				"id_rol": id_rol,
				"id_estado": id_estado
			});
		}catch (error) {
			console.error(error);
			return res.status(401).json({response_text:"Usuario no existe"});
		}

    });
}