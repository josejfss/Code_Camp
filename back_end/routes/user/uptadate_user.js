const {encriptar} = require('../../encryption/encriptar')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config();



const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.put('/update_user',upload.any(), async function(req,res){
        const { 
            id_usuario,
            correo_electronico, 
            primer_nombre,
            segundo_nombre,
            primer_apellido,
            segundo_apellido,
            telefono,
            id_estado,
            id_rol
         } = req.body;
        
        // Validar campos obligatorios
         if (!correo_electronico || !id_usuario || !primer_nombre || !primer_apellido || !telefono || !id_estado || !id_rol) {
            return res.status(400).json({response_text:"Faltan campos obligatorios"});
        }
        
		
        try {
            // Validar si ya existe el correo en los usuarios registrados
			const usuario_existe = await sequelize.query(`Select *
                                                        FROM usuario
                                                        where correo_electronico = '${correo_electronico}' 
                                                            AND id_usuario <> ${id_usuario};`
                                                        );

			if (usuario_existe[0].length > 0) {
				return res.status(400).json({response_text:"El correo ya se encuentra registrado"});
			}

			//Actualizar usuario con procedimiento almacenado
            const usuario = await sequelize.query(`EXEC update_usuario ${id_usuario},
                '${correo_electronico}',
				'${primer_nombre}',
				'${segundo_nombre}',
				'${primer_apellido}',
				'${segundo_apellido}',
				'${telefono}',
				${id_estado},
				${id_rol};
			`);

            return res.status(200).json({
                "response_text":"Datos de usuario actualizados", 
            });

		} catch (error) {
			return res.status(500).json({response_text:"Error al modificar los datos de usuario"});
		}

    });
}