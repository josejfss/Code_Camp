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
	app.put('/delete_product', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try{
            const {
                id_producto,
                id_estado
            } = req.body;
            
            // Validar campos obligatorios
            if (!id_producto || !id_estado) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            }

            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)
            

            try {
                // Llamar al procedimiento almacenado para crear un producto
                await sequelize.query(`EXEC delete_producto ${id_producto}, ${id_estado}, ${id_usuario};`);
                return res.status(200).json({
                    "response_text": "Producto eliminado exitosamente", 
                });
            }catch (error) {
                return res.status(400).json({response_text:error.message});
            }
        }catch (error) {
            return res.status(400).json({response_text:error});
        }

    });
}