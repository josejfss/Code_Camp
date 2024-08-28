const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const checkAuth = require('../../middleware/auth');
const { verifyToken } = require('../../encryption/jwt')

require('dotenv').config();

//Configurar sequelize para sql server
const Sequelize = require('sequelize');
const sequelize = new Sequelize (process.env.DATABASE, 
    process.env.USER_DATABASE, 
    process.env.PASSWORD_USER_DATABASE, {
    host: process.env.HOST_DATABASE,
    dialect: 'mssql',
    port: process.env.PORT_DATABASE,
    dialectOptions: {
        options: {
            encrypt: true,
        }
    }
});


module.exports = (express,app) => {
    
	app.post('/create_factura_p', checkAuth, upload.any(), async function(req,res){
        try{
            const { 
                departamento,
                municipio,
                zona,
                complemento_direccion,
                fecha_entrega,
                id_estado = 1010,
                detalle_orden,
                telefono = "",
                correo_electronico = "",
                nombre = "",
                apellido = ""
            } = req.body;
            
            // Validar campos obligatorios
            if (!departamento || !municipio || !zona || !complemento_direccion || !fecha_entrega || !detalle_orden) {
                return res.status(400).json({response_text:"Faltan campos obligatorios"});
            }
                        ;
            const token = req.headers.authorization.split(' ').pop() //TODO:123123213
            const {id_usuario} = await verifyToken(token)

            
            try {
                let query = `DECLARE @detalle_orden AS tipo_detalle_orden;
                INSERT INTO @detalle_orden (id_producto, cantidad, precio)
                VALUES`;

                //Hacemos la query de detalle_orden
                for(let i = 0; i < detalle_orden.length; i++){
                    if(i == detalle_orden.length - 1){
                        query += `(${detalle_orden[i].id_producto}, ${detalle_orden[i].cantidad}, ${detalle_orden[i].precio});\n`
                    }else{
                        query += `(${detalle_orden[i].id_producto}, ${detalle_orden[i].cantidad}, ${detalle_orden[i].precio}),\n`
                    }
                }


                query += `EXEC crear_pedido '${departamento}',
                '${municipio}',
                '${zona}', 
                '${complemento_direccion}',
                '${fecha_entrega}',
                ${id_usuario},
                ${id_estado},
                @detalle_orden,
                '${telefono}',
                '${correo_electronico}',
                '${nombre}',
                '${apellido}';
                `

                console.log(query);
                // Llamar al procedimiento almacenado para crear un producto
                const factura_p = await sequelize.query(`${query}`);
                // if (state[0].row_aff === 0) {
                //     return res.status(400).json({response_text:"Error al crear estado"});
                // }
                return res.status(200).json({
                    "response_text": "Factura creada exitosamente", 
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