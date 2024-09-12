const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const checkAuth = require("../../middleware/auth");
const { verifyToken } = require("../../encryption/jwt");

const sequelize = require('../../base_datos/conexion_bd')

module.exports = (express, app) => {
  app.post("/get_detail_order", checkAuth, upload.any(), async function (req, res) {
      try {
        const { id_orden, admin=0 } = req.body;
        const token = req.headers.authorization.split(" ").pop();
        const { id_usuario } = await verifyToken(token);

        if (!id_orden) {
          return res
            .status(400)
            .json({ response_text: "Faltan campos obligatorios" });
        }

        try {
          let query = ``;
          if (admin === 0){
            query = `select pe.cantidad, pr.nombre producto, pr.precio precio_unitario, pe.subtotal
from orden od
inner join pedido pe on od.id_orden = pe.id_orden
inner join producto pr on pr.id_producto = pe.id_producto
where od.id_usuario = ${id_usuario} and od.id_orden = ${id_orden};`;
          }else{
            query = `select pe.cantidad, pr.nombre producto, pr.precio precio_unitario, pe.subtotal
from orden od
inner join pedido pe on od.id_orden = pe.id_orden
inner join producto pr on pr.id_producto = pe.id_producto
where od.id_orden = ${id_orden};`;
          }
          
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
