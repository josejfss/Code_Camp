const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const checkAuth = require("../../middleware/auth");
const { verifyToken } = require("../../encryption/jwt");

const sequelize = require('../../base_datos/conexion_bd')

module.exports = (express, app) => {
  app.post("/get_detail_order", checkAuth, upload.any(), async function (req, res) {
      try {
        const { id_orden } = req.body;
        const token = req.headers.authorization.split(" ").pop(); //TODO:123123213
        const { id_usuario } = await verifyToken(token);

        if (!id_orden) {
          return res
            .status(400)
            .json({ response_text: "Faltan campos obligatorios" });
        }

        try {
          query = `select pe.cantidad, pr.nombre producto, pr.precio precio_unitario, pe.subtotal
from pedido pe
inner join producto pr on pe.id_producto = pr.id_producto
inner join orden od on pe.id_orden = pe.id_orden
where pe.id_orden = ${id_orden} and od.id_usuario = ${id_usuario};`;
          // Llamar al procedimiento almacenado para crear un estado
          const data = await sequelize.query(query);
          // actualizar el campo foto con la url de la imagen

          return res.status(200).json({
            data: data[0],
          });
        } catch (error) {
          console.log(error);
          return res.status(400).json({ response_text: error });
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({ response_text: error });
      }
    }
  );
};
