const multer  = require('multer')
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3')
const path = require('path');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const { verifyToken } = require('../../encryption/jwt')
const uuid = require('uuid')

require('dotenv').config();
const {estados} = require('../../config')
//Configurar sequelize para sql server
const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    //Nota falta agregar la eliminación de la imagen anterior
	app.post('/update_image_producto', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try{
            const {
                id_producto
            } = req.body;
            
            // Validar campos obligatorios
            if (!id_producto) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            }

            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)
            //Validad si viene archivo en files
            if(req.files.length === 0){
                return res.status(406).json({response_text:"is not present file"})
            }
            const file_path = path.join(process.cwd(), req.files[0].destination, req.files[0].filename)
            

            //CREAR BINARIO DE ARCHIVO
            const binario = await new Buffer.from( 
                fs.readFileSync(
                    file_path
                    ,'base64'
                )
                ,'base64'
            )
            //eliminar archivo
            fs.unlink(file_path, (err => {
                if (err) res.status(500).json({response_text:"err drop file temp"})
            }));

            let key = uuid.v1() + "." + req.files[0].mimetype.split('/')[1];

            const s3Client = new S3Client({ region: process.env.AWS_REGION });
            const bucket_name = process.env.AWS_BUCKET_NAME;
            

            s3Client.send(
                new PutObjectCommand({
                    Body: binario,
                    Bucket: bucket_name,
                    Key: "code_camp/productos/"+key,
                    ContentType: req.files[0].mimetype
                })
            ).then(data => {
                console.log("Success in upload image: ");
            }).catch(err => {
                console.log("Error: ", err);
                return res.status(400).json({response_text: "Error al subir la imagen"});
            });

            try {
                // Llamar al procedimiento almacenado para crear un producto
                const state = await sequelize.query(`EXEC update_image ${id_producto}, '${key}', ${id_usuario};`
                                                                        );
                return res.status(200).json({
                    "response_text": "Imagen actualizada", 
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