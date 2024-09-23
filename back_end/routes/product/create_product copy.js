const multer = require("multer");
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const checkAuth = require("../../middleware/auth");
const check_role_auth = require("../../middleware/role_auth");
const { verifyToken } = require("../../encryption/jwt");

require("dotenv").config();
const { estados } = require("../../config");
//Configurar sequelize para sql server
const sequelize = require("../../base_datos/conexion_bd");

module.exports = (express, app) => {
  app.post(
    "/create_product2",
    checkAuth,
    check_role_auth(2),
    upload.any(),
    async function (req, res) {
      try {
        const {
          nombre,
          marca,
          codigo,
          stock,
          id_estado = estados.Disponible,
          id_categoria_producto,
          precio,
        } = req.body;
        console.log("req", req);
        // Validar campos obligatorios
        if (
          !nombre ||
          !marca ||
          !codigo ||
          !id_estado ||
          !id_categoria_producto ||
          !precio ||
          !stock
        ) {
          return res
            .status(400)
            .json({ response_text: "Faltan campos obligatorios" });
        }
        const token = req.headers.authorization.split(" ").pop(); //TODO:123123213
        const { id_usuario } = await verifyToken(token);
        //Validad si viene archivo en files
        if (req.files.length === 0) {
          return res.status(406).json({ response_text: "is not present file" });
        }
        const file_path = path.join(
          process.cwd(),
          req.files[0].destination,
          req.files[0].filename
        );

        //CREAR BINARIO DE ARCHIVO
        const imageBuffer = await new Buffer.from( 
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
        try {
          // Llamar al procedimiento almacenado para crear un producto
          const state = await sequelize.query(
            `EXEC insert_producto '${nombre}', 
                                                                            '${marca}', 
                                                                            '${codigo}', 
                                                                            ${stock}, 
                                                                            ${id_estado}, 
                                                                            ${id_categoria_producto},
                                                                            ${id_usuario}, 
                                                                            :imagen,
                                                                            '${imageType}', 
                                                                            ${precio},
                                                                            ${estados.Eliminado};`,
            {
              replacements: {
                imagen: imageBuffer,
              }
            }
          );
          return res.status(200).json({
            response_text: "Producto creado",
          });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ response_text: error.message });
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({ response_text: error });
      }
    }
  );
};
