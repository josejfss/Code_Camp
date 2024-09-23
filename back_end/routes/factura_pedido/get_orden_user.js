const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const checkAuth = require("../../middleware/auth");
const { verifyToken } = require("../../encryption/jwt");

const sequelize = require('../../base_datos/conexion_bd')

module.exports = (express, app) => {
  app.get("/get_user_order", checkAuth, upload.any(), async function (req, res) {
      try {
        const token = req.headers.authorization.split(" ").pop(); //TODO:123123213
        const { id_usuario } = await verifyToken(token);

      
        try {
          query = `select o.id_orden,
	o.complemento_direccion + ' ' + o.zona +', ' + o.municipio + ', ' + o.departamento direccion,
	CONVERT(varchar,o.fecha_entrega,3) fecha_entrega,
  CONVERT(varchar,o.fecha_creacion,3) fecha_creacion,
	o.total_orden,
	e.nombre estado,
  u.primer_nombre + ' ' + u.segundo_nombre + ' ' + u.primer_apellido + ' ' + u.segundo_apellido nombre_completo
from orden o
inner join estado e on e.id_estado = o.id_estado
inner join usuario u on u.id_usuario = o.id_usuario
where o.id_usuario = ${id_usuario}`;
          // Llamar al procedimiento almacenado para crear un estado
          const data = await sequelize.query(query);
          // actualizar el campo foto con la url de la imagen
          console.log("datos: ", data[0])
          return res.status(200).json({
            data: data[0],
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
