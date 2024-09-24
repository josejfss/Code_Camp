const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const check_role_auth = require('../../middleware/role_auth');
const path = require("path");
const fs = require("fs");
const { verifyToken } = require('../../encryption/jwt')
const {estados} = require('../../config')

require('dotenv').config();
const sequelize = require('../../base_datos/conexion_bd')


module.exports = (express,app) => {
    
	app.put('/update_product', checkAuth, check_role_auth(2), upload.any(), async function(req,res){
        try{
            const { 
                id_producto,
                nombre,
                marca,
                codigo,
                stock,
                precio,
                id_estado = estados.Disponible,
                id_categoria_producto,
                changeImage                
            } = req.body;

            // Validar campos obligatorios
            if (!nombre || !marca || !codigo || !id_estado || !id_categoria_producto || !precio || !stock || !id_producto) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            };


            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)
            //Validad si viene archivo en files
            let query = ``;
            let imageBuffer = null;
            
            if(changeImage === 'true'){
                const file_path = path.join(
                    process.cwd(),
                    req.files[0].destination,
                    req.files[0].filename
                );
          
                  //CREAR BINARIO DE ARCHIVO
                imageBuffer = await new Buffer.from( 
                      fs.readFileSync(
                          file_path
                          ,'base64'
                      )
                      ,'base64'
                  )
                const imageType = req.files[0].mimetype;
                   //eliminar archivo
                fs.unlink(file_path, (err => {
                    if (err) res.status(500).json({response_text:"err drop file temp"})
                }));
                query = `EXEC update_producto_image '${id_producto}',
                '${nombre}',
                '${marca}',
                '${codigo}',
                ${stock},
                ${precio},
                ${id_estado},
                ${id_categoria_producto},
                :imagen,
                '${imageType}',
                ${estados.Eliminado},
                ${id_usuario};`
                try {
                    const state = await sequelize.query(query, {
                        replacements: {
                          imagen: imageBuffer,
                        }
                      });
                    return res.status(200).json({
                        "response_text": "Producto actualizado", 
                    });
                }catch (error) {
                    
                    return res.status(400).json({response_text:error.message});
                }
            } else{
                query = `EXEC update_producto ${id_producto},
                '${nombre}',
                '${marca}', 
                '${codigo}',
                ${stock},
                ${precio},
                ${id_estado},
                ${id_categoria_producto},
                ${estados.Eliminado},
                ${id_usuario};`

                try {
                    // Llamar al procedimiento almacenado para crear un producto
                    const state = await sequelize.query(query);
                    return res.status(200).json({
                        "response_text": "Producto actualizado", 
                    });
                }catch (error) {
                    return res.status(400).json({response_text:error.message});
                }
            }
            
           
        }catch (error) {
            return res.status(400).json({response_text:error});
        }

    });
}