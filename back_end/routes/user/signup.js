const {encriptar} = require('../../encryption/encriptar')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config();
const config = require('../../config')


//Configurar sequelize para sql server
const sequelize = require('../../base_datos/conexion_bd');

module.exports = (express,app) => {
    
	app.post('/signup',upload.any(), async function(req,res){
        const { 
            correo_electronico, 
            contrasena, 
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            telefono,
            fecha_nacimiento,
            id_estado = config.estados["Activo"],
            id_rol
         } = req.body;
        
        // Validar campos obligatorios
         if (!correo_electronico || !contrasena || !primer_nombre || !primer_apellido || !telefono || !fecha_nacimiento || !id_estado || !id_rol) {
            return res.status(400).json({response_text:"Faltan campos obligatorios"});
        }
        
        const password_hash = await encriptar(contrasena);
		
        try {
			// Validar si ya existe el correo
			const usuario_existe = await sequelize.query(`SELECT * FROM usuario WHERE correo_electronico = '${correo_electronico}'`);
			if (usuario_existe[0].length > 0) {
				return res.status(400).json({response_text:"El correo ya se encuentra registrado"});
			}

			//Crear usuario con procedimiento almacenado
			
			const usuario = await sequelize.query(`EXEC insert_usuario '${correo_electronico}',
				'${password_hash}',
				'${primer_nombre}',
				'${segundo_nombre}',
				'${primer_apellido}',
				'${segundo_apellido}',
				'${telefono}',
				'${fecha_nacimiento}',
				${id_estado},
				${id_rol};
			`);

            return res.status(200).json({
                "response_text":"Usuario creado",
            });
		} catch (error) {
			return res.status(500).json({response_text:"Error al crear usuario"});
		}
        
    });
}