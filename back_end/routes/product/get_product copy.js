const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { estados } = require("../../config");
const sequelize = require("../../base_datos/conexion_bd");

module.exports = (express, app) => {
  app.get("/get_product2", upload.any(), async function (req, res) {
    try {
      try {
        // Llamar al procedimiento almacenado para crear un estado
        const state =
          await sequelize.query(`select * from get_products;`);

        const productosConImagen = state[0].map((producto) => {
          const imagenBase64 = Buffer.from(producto.foto).toString(
            "base64"
          );
          return {
            ...producto,
            foto: `data:${producto.tipo_imagen};base64,${imagenBase64}`,
          };
        });
          
        return res.status(200).json({
          data: productosConImagen,
        });
      } catch (error) {
        return res.status(400).json({ response_text: error.message });
      }
    } catch (error) {
      return res.status(400).json({ response_text: error });
    }
  });
};
