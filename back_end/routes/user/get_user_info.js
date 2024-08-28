const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const checkAuth = require("../../middleware/auth");
const { verifyToken } = require("../../encryption/jwt");

//Configurar sequelize para sql server
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_DATABASE,
  process.env.PASSWORD_USER_DATABASE,
  {
    host: process.env.HOST_DATABASE,
    dialect: "mssql",
    port: process.env.PORT_DATABASE,
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);

module.exports = (express, app) => {
  app.get("/get_user_info", checkAuth, upload.any(), async function (req, res) {
      try {
        
        const token = req.headers.authorization.split(" ").pop(); //TODO:123123213
        const { id_usuario } = await verifyToken(token);

      

        try {
          query = `select u.correo_electronico, 
	u.primer_nombre + ' '+ u.segundo_nombre + ' '+ u.primer_apellido + ' ' + u.segundo_apellido as nombre_completo,
	u.fecha_nacimiento,
	r.nombre rol,
	e.nombre estado
from usuario u
inner join rol r on u.id_rol = r.id_rol
inner join estado e on u.id_estado = e.id_estado
where u.id_usuario = ${id_usuario};`;
          // Llamar al procedimiento almacenado para crear un estado
          const data = await sequelize.query(query);
          // actualizar el campo foto con la url de la imagen

          return res.status(200).json(data[0][0]);
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
