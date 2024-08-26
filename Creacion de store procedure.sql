use code_camp;

-- PROCEDIMIENTOS ALMACENADOS 

-- -----------------------------
--		SP TABLA ESTADO
-- -----------------------------


CREATE PROCEDURE insert_estado
	@nombre varchar(45),
	@id_usuario int = 0
AS
BEGIN
BEGIN TRANSACTION;

	BEGIN TRY
		DECLARE @id_estado INT;

		INSERT INTO estado(nombre) VALUES (@nombre);
		--Obtener el id del estado
		SET @id_estado = SCOPE_IDENTITY();
		-- llenado de bitacora
		INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
		VALUES (GETDATE(), @id_usuario, 'Se creo el registro en la tabla ESTADO = '+@nombre+' ID NUMERO = '+ CONVERT(varchar(25), @id_estado));

	COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		-- deshacemos la transaccion si hay un error
		ROLLBACK TRANSACTION;

		-- Manejamos los errores
		DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
		RAISERROR(@ErrorMensaje, 16, 1);
		
		-- llenado de bitacora
		INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
		VALUES (GETDATE(), @id_usuario, 'ERROR al registar informacion en TABLA ESTADO, ERROR = ' + @ErrorMensaje);

	END CATCH
END;

-- ------------------------------

CREATE PROCEDURE update_estado
	@id_estado INT,
	@nombre VARCHAR(45),
	@id_usuario int = 0
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	UPDATE estado
	SET nombre = @nombre
	WHERE id_estado = @id_estado;

	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se modifico el REGISTRO con IDENTIFICADOR NUMERO = '+ CONVERT(varchar(25), @id_estado)+' con el siguiente VALOR = '+ @nombre);

	COMMIT TRANSACTION;

END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al MODIFICAR informacion en TABLA ESTADO, ERROR = ' + @ErrorMensaje);

END CATCH
END;

-- -------------------------------
--			SP TABLA ROL
-- -------------------------------

CREATE PROCEDURE insert_rol
@nombre varchar(45),
@id_usuario int = 0
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @id_rol int;

	INSERT INTO rol(nombre) VALUES (@nombre);

	SET @id_rol = SCOPE_IDENTITY();
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se creo el registro en la tabla ROL = '+@nombre+' IDENTIFICADOR NUMERO = '+ CONVERT(varchar(25), @id_rol));

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al registar informacion en TABLA ROL, ERROR = ' + @ErrorMensaje);

END CATCH
END;
-- ------------------------------

CREATE PROCEDURE update_rol
	@id_rol INT,
	@nombre VARCHAR(45),
	@id_usuario int
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	UPDATE rol
	SET nombre = @nombre
	WHERE id_rol = @id_rol;

	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se modifico el REGISTRO con IDENTIFICADOR NUMERO'+ CONVERT(varchar(25), @id_rol)+' con el siguiente VALOR = '+ @nombre);

	COMMIT TRANSACTION;

END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al MODFICICAR informacion en TABLA ROL, ERROR = ' + @ErrorMensaje);

END CATCH
END;


-- ---------------------------------------
--     SP TABLA CATEGORIA_PRODUCTO
-- ---------------------------------------

CREATE PROCEDURE insert_categoria_producto
	@nombre varchar(45),
	@id_estado int,
	@id_usuario int
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY

	DECLARE @id_categoria_producto int;

	INSERT INTO categoria_producto(nombre, fecha_creacion, id_estado, id_usuario) 
	VALUES (@nombre, GETDATE(), @id_estado, @id_usuario);

	SET @id_categoria_producto = SCOPE_IDENTITY();
-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se creo el registro en la tabla CATEGORIA_PRODUCTO = '+@nombre+' ID NUMERO = '+ CONVERT(varchar(25), @id_categoria_producto));

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al registar informacion en TABLA CATEGORIA_PRODUCTO, ERROR = ' + @ErrorMensaje);

END CATCH
END;
-- ------------------------------
CREATE PROCEDURE update_categoria_producto
	@id_categoria_producto INT,
	@nombre VARCHAR(45),
	@id_estado INT,
	@id_usuario INT
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	UPDATE categoria_producto
	SET 
		nombre = @nombre,
		id_estado = @id_estado,
		id_usuario = @id_usuario
	WHERE id_categoria_producto = @id_categoria_producto;

	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se modifico el REGISTRO de la tabla CATEGORIA_PRODUCTO = '+ CONVERT(varchar(25), @id_categoria_producto));

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al MODIFICAR informacion en TABLA CATEGORIA_PRODUCTO, ERROR = ' + @ErrorMensaje);

END CATCH
END;


-- ----------------------------------------------
--            SP TABLA USUARIO
-- ----------------------------------------------


CREATE PROCEDURE insert_usuario
	@correo_electronico varchar(70),
	@contrasena VARCHAR(250),
	@primer_nombre varchar(100),
	@segundo_nombre varchar(100),
	@primer_apellido varchar(100),
	@segundo_apellido varchar(100),
	@telefono varchar(45),
	@fecha_nacimiento date,
	@id_estado int,
	@id_rol int
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	DECLARE @id_usuario int;
	INSERT INTO usuario(correo_electronico, 
						contrasena,
						primer_nombre, 
						segundo_nombre,
						primer_apellido,
						segundo_apellido,
						telefono,
						fecha_nacimiento,
						fecha_creacion,
						id_estado,
						id_rol)
	VALUES(@correo_electronico,
			@contrasena,
			@primer_nombre,
			@segundo_nombre,
			@primer_apellido,
			@segundo_apellido,
			@telefono,
			@fecha_nacimiento,
			GETDATE(),
			@id_estado,
			@id_rol);

	SET @id_usuario = SCOPE_IDENTITY();
-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se creo el registro en la tabla USUARIO con ID NUMERO = '+ CONVERT(varchar(25), @id_estado));

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al registar informacion en TABLA USUARIO, ERROR = ' + @ErrorMensaje);

END CATCH
END;

--------------------------------------------------
CREATE PROCEDURE update_usuario
	@id_usuario int,
	@correo_electronico varchar(70),
	@primer_nombre varchar(100),
	@segundo_nombre varchar(100),
	@primer_apellido varchar(100),
	@segundo_apellido varchar(100),
	@telefono varchar(45),
	@id_estado int,
	@id_rol int

AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	UPDATE usuario
	SET correo_electronico = @correo_electronico,
		primer_nombre = @primer_nombre,
		segundo_nombre = @segundo_nombre,
		primer_apellido = @primer_apellido,
		segundo_apellido = @segundo_apellido,
		telefono = @telefono,
		id_estado = @id_estado,
		id_rol = @id_rol
	WHERE id_usuario = @id_usuario

	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se modifico el REGISTRO de la tabla USUAR CON ID = '+ CONVERT(varchar(25), @id_rol));

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al MODIFICAR informacion en TABLA USUARIO, ERROR = ' + @ErrorMensaje);

END CATCH

END;


-- ----------------------------------------------
--            SP TABLA PRODUCTO
-- ----------------------------------------------

CREATE PROCEDURE insert_producto
	@nombre varchar(45),
	@marca varchar(45),
	@codigo varchar(45),
	@stock float,
	@id_estado int,
	@id_categoria_producto int,
	@id_usuario int = 21,
	@foto varbinary(max) = NULL
	AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY

	DECLARE @id_producto int;

	INSERT INTO producto(
					nombre,
					marca,
					codigo,
					stock,
					fecha_creacion,
					foto,
					id_estado,
					id_categoria_producto,
					id_usuario
					)
	VALUES(
		@nombre,
		@marca,
		@codigo,
		@stock,
		GETDATE(),
		@foto,
		@id_estado,
		@id_categoria_producto,
		@id_usuario
	);

	SET @id_producto = SCOPE_IDENTITY();
-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se creo el registro en la tabla PRODUCTO con ID NUMERO = '+ CONVERT(varchar(25), @id_estado));

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al registar informacion en TABLA PRODUCTO, ERROR = ' + @ErrorMensaje);

END CATCH
END;

--------------------------------------------------
CREATE PROCEDURE update_producto
	@id_producto int,
	@nombre varchar(45),
	@marca varchar(45),
	@codigo varchar(45),
	@stock float,
	@foto varbinary(max),
	@id_estado int,
	@id_categoria_producto int,
	@id_usuario int = 0
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	UPDATE producto
	SET
		nombre = @nombre,
		marca = @marca,
		codigo = @codigo,
		foto = @foto,
		id_estado = @id_estado,
		id_categoria_producto = @id_categoria_producto,
		id_usuario = @id_usuario
	WHERE id_producto = @id_producto

	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se modifico el REGISTRO de la tabla PRODUCTO con ID = '+ CONVERT(varchar(25), @id_producto));

	COMMIT TRANSACTION;

END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al MODIFICAR informacion en TABLA PRODUCTO, ERROR = ' + @ErrorMensaje);

END CATCH
END;





-- ----------------------------------------------
--            SP TABLA CREAR ORDEN Y DETALLE
-- ----------------------------------------------

CREATE TYPE tipo_detalle_orden AS TABLE(
	id_producto int,
	cantidad int,
	precio float
);

DROP TYPE tipo_detalle_orden;
-----------------------------------------------------
DROP PROCEDURE crear_pedido;

CREATE PROCEDURE crear_pedido
	
	@departamento varchar(70),
	@municipio varchar(70),
	@zona varchar(10),
	@complemento_direccion varchar(250),
	@telefono varchar(45),
	@fecha_entrega date,
	@total_orden float,
	@id_usuario int,
	@id_estado int,
	@detalle_orden as tipo_detalle_orden READONLY,
	@nombre varchar(100) = NULL,
	@apellido varchar(100) = NULL,
	@correo_electronico varchar(50) = NULL
AS
BEGIN
	DECLARE @orden_id INT

	BEGIN TRANSACTION;

	BEGIN TRY
		-- Insertar los valores de la orden
		INSERT INTO orden(
			fecha_creacion,
			nombre,
			apellido,
			departamento,
			municipio,
			zona,
			complemento_direccion,
			telefono,
			correo_electronico,
			fecha_entrega,
			total_orden,
			id_usuario,
			id_estado
		)
		VALUES (
			GETDATE(),
			@nombre,
			@apellido,
			@departamento,
			@municipio,
			@zona,
			@complemento_direccion,
			@telefono,
			@correo_electronico,
			@fecha_entrega,
			@total_orden,
			@id_usuario,
			@id_estado
		);

		-- obtener el id de la orden
		SET @orden_id = SCOPE_IDENTITY();

		-- Insertar en la tabla detalle orden
		INSERT INTO pedido(cantidad, precio, id_orden, id_producto, subtotal)
        SELECT do.cantidad, do.precio, @orden_id, do.id_producto, (do.cantidad * do.precio) AS subtotal
        FROM @detalle_orden do;


		-- llenado de bitacora
		INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
		VALUES (GETDATE(), @id_usuario, 'Se creo el registro en la tabla ORDEN CON  ID ORDEN = '+ CONVERT(varchar(25), @orden_id));
		-- Confirmamos la transacci�n
		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		-- deshacemos la transacci�n si hay un error
		ROLLBACK TRANSACTION;

		-- Manejamos los errores
        DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMensaje, 16, 1);
		
		-- llenado de bitacora
		INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
		VALUES (GETDATE(), @id_usuario, 'ERROR al registar informaci�n en TABLA ORDEN, ERROR = ' + @ErrorMensaje);

	END CATCH
END


--------------------------------------------------
-- CREAR SP PARA MODFICAR LA TABLA ORDEN
-- -----------------------------------------------
CREATE PROCEDURE update_orden
	@fecha_entrega date,
	@total_orden float,
	@id_usuario int,
	@id_estado int,
	@id_orden int,
	@departamento VARCHAR(70),
	@municipio varchar(70),
	@zona varchar(10),
	@complemento_direccion varchar(250),
	@nombre varchar(100) = NULL,
	@apellido varchar(100) = NULL,
	@correo_electronico varchar(50) = null,
	@telefono varchar(45)= NULL


AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY

	UPDATE orden
	SET 
		telefono = @telefono,
		correo_electronico = @correo_electronico,
		fecha_entrega = @fecha_entrega,
		total_orden = @total_orden,
		id_estado = @id_estado,
		id_usuario = @id_usuario,
		nombre = @nombre,
		apellido = @apellido,
		departamento = @departamento,
		municipio = @municipio,
		zona = @zona,
		complemento_direccion = @complemento_direccion
	WHERE id_orden = @id_orden

	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se modifico el REGISTRO de la tabla ORDEN con ID = '+ CONVERT(varchar(25), @id_orden));

	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al MODIFICAR informacion en TABLA ORDEN, ERROR = ' + @ErrorMensaje);

END CATCH
END;


------------------------------------------
--  SP PARA MODIFICAR DETALLE DE ORDEN
-- ---------------------------------------
CREATE PROCEDURE update_orden_detalle
	@id_orden_detalle int,
	@cantidad int,
	@precio float,
	@subtotal float,
	@id_orden int,
	@id_producto int,
	@id_usuario int = NULL
AS
BEGIN
BEGIN TRANSACTION;
BEGIN TRY
	UPDATE orden_detalle
	SET
		cantidad = @cantidad,
		precio = @precio,
		subtotal = @subtotal,
		id_orden = @id_orden,
		id_producto = @id_producto
	WHERE  id_orden_detalle = @id_orden_detalle

	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'Se modifico el REGISTRO de la tabla ORDEN DETALLE con IDENTIFICADOR = '+ CONVERT(varchar(25), @id_orden_detalle));

	COMMIT TRANSACTION;

END TRY
BEGIN CATCH
	-- deshacemos la transaccion si hay un error
	ROLLBACK TRANSACTION;

	-- Manejamos los errores
	DECLARE @ErrorMensaje NVARCHAR(4000) = ERROR_MESSAGE();
	RAISERROR(@ErrorMensaje, 16, 1);
	
	-- llenado de bitacora
	INSERT INTO bitacora(timestamp_operacion, id_usuario, descripcion)
	VALUES (GETDATE(), @id_usuario, 'ERROR al MODIFICAR informacion en TABLA ORDEN DETALLE, ERROR = ' + @ErrorMensaje);

END CATCH
END;








EXEC insert_rol @nombre = 'Cliente';
EXEC insert_rol @nombre = 'Operador administrativo';


EXEC insert_estado @nombre = 'Agotado';
EXEC insert_estado @nombre = 'Descontinuado';
EXEC insert_estado @nombre = 'Disponible';
EXEC insert_estado @nombre = 'En Oferta';
EXEC insert_estado @nombre = 'Preventa';
EXEC insert_estado @nombre = 'Edicion limitada';
EXEC insert_estado @nombre = 'Retirado';

EXEC insert_estado @nombre = 'Activo';
EXEC insert_estado @nombre = 'Inactivo';
EXEC insert_estado @nombre = 'Suspendido';
EXEC insert_estado @nombre = 'Bloqueado';
EXEC insert_estado @nombre = 'En proceso de eliminacion';

EXEC insert_estado @nombre = 'Pendiente';
EXEC insert_estado @nombre = 'En proceso';
EXEC insert_estado @nombre = 'Facturado';
EXEC update_estado @id_estado = 32, @nombre = 'Sin existencias';

EXEC insert_usuario 'juan.carlos.perez@example.com','12345678', 'Juan', 'Carlos', 'Perez', 'Lopez', '12345678', '1985-05-14', 1, 2;
EXEC insert_usuario 'maria.fernanda.garcia@example.com', 'Mar�a', 'Fernanda', 'Garc�a', 'Torres', '23456789', '1990-08-22', 38, 1
EXEC insert_usuario 'jose.antonio.ramirez@example.com', 'Jos�', 'Antonio', 'Ram�rez', 'D�az', '34567890', '1979-12-01', 42, 1;
EXEC insert_usuario 'ana.lucia.gomez@example.com', 'Ana', 'Luc�a', 'G�mez', 'Mendoza', '45678901', '1988-03-30', 39, 1;
EXEC insert_usuario 'luis.miguel.torres@example.com', 'Luis', 'Miguel', 'Torres', 'Vargas', '56789012', '1992-07-17', 41, 1;
EXEC insert_usuario 'carla.patricia.fernandez@example.com', 'Carla', 'Patricia', 'Fern�ndez', 'Ruiz', '67890123', '1983-11-05', 38, 1;
EXEC insert_usuario 'roberto.alejandro.martinez@example.com', 'Roberto', 'Alejandro', 'Mart�nez', 'Salinas', '78901234', '1995-02-12', 40, 1;
EXEC insert_usuario 'elena.sofia.sanchez@example.com', 'Elena', 'Sof�a', 'S�nchez', 'Morales', '89012345', '1980-09-27', 40, 1;
EXEC insert_usuario 'pablo.esteban.rojas@example.com', 'Pablo', 'Esteban', 'Rojas', 'Aguilar', '90123456', '1987-06-18', 39, 1;
EXEC insert_usuario 'daniela.paola.hernandez@example.com', 'Daniela', 'Paola', 'Hern�ndez', 'Castro', '12345679', '1982-04-25', 42, 1;
EXEC insert_usuario 'jorge.luis.ortiz@example.com', 'Jorge', 'Luis', 'Ortiz', 'Paredes', '23456780', '1993-10-11', 41, 1;
EXEC insert_usuario 'isabel.mariana.vega@example.com', 'Isabel', 'Mariana', 'Vega', 'Pe�a', '34567891', '1986-01-08', 40, 1;
EXEC insert_usuario 'carlos.eduardo.flores@example.com', 'Carlos', 'Eduardo', 'Flores', 'Navarro', '45678902', '1991-11-23', 38, 1;
EXEC insert_usuario 'lucia.beatriz.medina@example.com', 'Luc�a', 'Beatriz', 'Medina', 'Ramos', '56789013', '1984-05-30', 43, 1;
EXEC insert_usuario 'ricardo.david.herrera@example.com', 'Ricardo', 'David', 'Herrera', 'R�os', '67890124', '1978-02-02', 42, 1;
EXEC insert_usuario 'maria.jose.lara@example.com', 'Mar�a', 'Jos�', 'Lara', 'Cruz', '78901235', '1990-08-15', 41, 1;
EXEC insert_usuario 'fernando.andres.vazquez@example.com', 'Fernando', 'Andr�s', 'V�zquez', 'Le�n', '89012346', '1981-03-10', 39, 1;
EXEC insert_usuario 'valeria.alejandra.castro@example.com', 'Valeria', 'Alejandra', 'Castro', 'Espinosa', '90123457', '1989-09-05', 38, 1;
EXEC insert_usuario 'gabriel.santiago.ruiz@example.com', 'Gabriel', 'Santiago', 'Ruiz', 'Acosta', '12345680', '1994-07-19', 40, 1;
EXEC insert_usuario 'sofia.catalina.morales@example.com', 'Sof�a', 'Catalina', 'Morales', 'Hern�ndez', '23456781', '1985-12-21', 43, 1;
EXEC insert_usuario 'jose.francisco.santos.salazar@example.com', 'Jose', 'Francisco', 'Santos', 'Salazar', '58746321', '1998-12-21', 43, 2;




EXEC insert_categoria_producto 'Cereales', 32, 7;
EXEC insert_categoria_producto 'L�cteos', 34, 12;
EXEC insert_categoria_producto 'Enlatados', 36, 18;
EXEC insert_categoria_producto 'Galletas', 33, 5;
EXEC insert_categoria_producto 'Bebidas', 35, 10;
EXEC insert_categoria_producto 'Snacks', 32, 15;
EXEC insert_categoria_producto 'Condimentos', 37, 8;
EXEC insert_categoria_producto 'Frutas', 33, 20;
EXEC insert_categoria_producto 'Verduras', 34, 3;
EXEC insert_categoria_producto 'Panader�a', 35, 17;
EXEC insert_categoria_producto 'Carnes', 32, 4;
EXEC insert_categoria_producto 'Pastas', 36, 14;
EXEC insert_categoria_producto 'Limpieza', 37, 9;
EXEC insert_categoria_producto 'Cereales', 33, 1;
EXEC insert_categoria_producto 'L�cteos', 34, 13;
EXEC insert_categoria_producto 'Enlatados', 36, 19;
EXEC insert_categoria_producto 'Galletas', 32, 2;
EXEC insert_categoria_producto 'Bebidas', 35, 16;
EXEC insert_categoria_producto 'Snacks', 37, 6;
EXEC insert_categoria_producto 'Condimentos', 34, 11;
EXEC insert_categoria_producto 'Frutas', 32, 18;
EXEC insert_categoria_producto 'Verduras', 33, 7;
EXEC insert_categoria_producto 'Panader�a', 36, 14;
EXEC insert_categoria_producto 'Carnes', 35, 12;
EXEC insert_categoria_producto 'Pastas', 37, 10;
EXEC insert_categoria_producto 'Limpieza', 34, 3;
EXEC insert_categoria_producto 'Cereales', 32, 15;
EXEC insert_categoria_producto 'L�cteos', 33, 2;
EXEC insert_categoria_producto 'Enlatados', 36, 11;
EXEC insert_categoria_producto 'Galletas', 37, 20;
EXEC insert_categoria_producto 'Bebidas', 34, 1;
EXEC insert_categoria_producto 'Snacks', 35, 17;
EXEC insert_categoria_producto 'Condimentos', 32, 8;
EXEC insert_categoria_producto 'Frutas', 37, 4;
EXEC insert_categoria_producto 'Verduras', 36, 13;
EXEC insert_categoria_producto 'Panader�a', 33, 9;
EXEC insert_categoria_producto 'Carnes', 34, 6;
EXEC insert_categoria_producto 'Pastas', 35, 19;
EXEC insert_categoria_producto 'Limpieza', 32, 5;
EXEC insert_categoria_producto 'Cereales', 36, 16;
EXEC insert_categoria_producto 'L�cteos', 37, 14;
EXEC insert_categoria_producto 'Enlatados', 33, 3;
EXEC insert_categoria_producto 'Galletas', 34, 18;
EXEC insert_categoria_producto 'Bebidas', 32, 12;
EXEC insert_categoria_producto 'Snacks', 36, 11;
EXEC insert_categoria_producto 'Condimentos', 37, 7;
EXEC insert_categoria_producto 'Frutas', 34, 19;
EXEC insert_categoria_producto 'Verduras', 35, 10;
EXEC insert_categoria_producto 'Panader�a', 32, 6;
EXEC insert_categoria_producto 'Carnes', 37, 13;



EXEC insert_producto 'Arroz Integral', 'La Preferida', '001-AI', 120, 34, 7;
EXEC insert_producto 'Frijoles Negros', 'Goya', '002-FN', 50, 34, 12;
EXEC insert_producto 'Aceite de Oliva', 'Bertolli', '003-AO', 30, 34, 18;
EXEC insert_producto 'Leche Descremada', 'Alpura', '004-LD', 80, 32, 5;
EXEC insert_producto 'Cereal de Avena', 'Quaker', '005-CA', 150, 34, 10;
EXEC insert_producto 'Pasta Spaghetti', 'Barilla', '006-PS', 200, 34, 15;
EXEC insert_producto 'Galletas de Chocolate', 'Gamesa', '007-GC', 60, 34, 8;
EXEC insert_producto 'Jugo de Naranja', 'Del Valle', '008-JN', 100, 34, 20;
EXEC insert_producto 'Yogurt Natural', 'Yoplait', '009-YN', 45, 34, 3;
EXEC insert_producto 'Pan Integral', 'Bimbo', '010-PI', 90, 34, 17;
EXEC insert_producto 'Salsa de Tomate', 'Hunts', '011-ST', 140, 34, 4;
EXEC insert_producto 'At�n en Agua', 'Dolores', '012-AA', 75, 34, 14;
EXEC insert_producto 'Arroz Blanco', 'La Preferida', '013-AB', 130, 33, 9;
EXEC insert_producto 'Frijoles Bayos', 'Isadora', '014-FB', 70, 34, 1;
EXEC insert_producto 'Mantequilla', 'Lala', '015-M', 55, 34, 13;
EXEC insert_producto 'Queso Panela', 'Nochebuena', '016-QP', 95, 34, 19;
EXEC insert_producto 'Caf� Molido', 'Nescaf�', '017-CM', 85, 36, 2;
EXEC insert_producto 'Galletas de Vainilla', 'Gamesa', '018-GV', 50, 34, 16;
EXEC insert_producto 'Refresco de Cola', 'Coca-Cola', '019-RC', 250, 34, 6;
EXEC insert_producto 'Agua Embotellada', 'Bonafont', '020-AE', 180, 34, 11;
EXEC insert_producto 'Cereal de Trigo', 'Kelloggs', '021-CT', 160, 34, 18;
EXEC insert_producto 'Yogurt de Fresa', 'Danone', '022-YF', 55, 34, 3;
EXEC insert_producto 'Pan Blanco', 'Bimbo', '023-PB', 110, 34, 17;
EXEC insert_producto 'Mayonesa', 'McCormick', '024-M', 125, 32, 4;
EXEC insert_producto 'Salsa de Soja', 'Kikkoman', '025-SS', 40, 34, 14;
EXEC insert_producto 'Leche Entera', 'Alpura', '026-LE', 100, 34, 9;
EXEC insert_producto 'Caf� Instant�neo', 'Nescaf�', '027-CI', 200, 34, 1;
EXEC insert_producto 'Galletas Saladas', 'Kretschmer', '028-GS', 90, 33, 13;
EXEC insert_producto 'Agua Mineral', 'Perrier', '029-AM', 60, 34, 19;
EXEC insert_producto 'Mermelada de Fresa', 'Smuckers', '030-MF', 75, 34, 2;
EXEC insert_producto 'Az�car Morena', 'Zulka', '031-AM', 85, 34, 16;
EXEC insert_producto 'Frijoles Refritos', 'Isadora', '032-FR', 70, 34, 6;
EXEC insert_producto 'Crema de Man�', 'Skippy', '033-CM', 110, 37, 11;
EXEC insert_producto 'Aceite Vegetal', 'Capullo', '034-AV', 140, 34, 18;
EXEC insert_producto 'Cereal Integral', 'Fitness', '035-CI', 120, 34, 3;
EXEC insert_producto 'Pan Molido', 'Bimbo', '036-PM', 130, 34, 17;
EXEC insert_producto 'At�n en Aceite', 'Tuny', '037-AA', 80, 34, 4;
EXEC insert_producto 'Leche Condensada', 'Nestl�', '038-LC', 60, 34, 14;
EXEC insert_producto 'Galletas Digestivas', 'Cu�tara', '039-GD', 70, 34, 9;
EXEC insert_producto 'Pasta Fusilli', 'Barilla', '040-PF', 200, 34, 1;
EXEC insert_producto 'Caf� de Olla', 'Nescaf�', '041-CO', 50, 34, 13;
EXEC insert_producto 'Refresco de Lim�n', 'Sprite', '042-RL', 210, 32, 19;
EXEC insert_producto 'Galletas de Mantequilla', 'Gamesa', '043-GM', 150, 34, 16;
EXEC insert_producto 'Jugo de Manzana', 'Del Valle', '044-JM', 170, 34, 6;
EXEC insert_producto 'Yogurt con Cereales', 'Lala', '045-YC', 65, 34, 11;
EXEC insert_producto 'Pan Tostado', 'Bimbo', '046-PT', 95, 34, 18;
EXEC insert_producto 'Manteca Vegetal', 'Inca', '047-MV', 130, 33, 3;
EXEC insert_producto 'Galletas Mar�a', 'Gamesa', '048-GM', 110, 34, 17;
EXEC insert_producto 'Leche Evaporada', 'Nestl�', '049-LE', 100, 34, 4;
EXEC insert_producto 'At�n Ahumado', 'Dolores', '050-AA', 85, 34, 14;
EXEC insert_producto 'Pasta Penne', 'Barilla', '051-PP', 180, 34, 9;
EXEC insert_producto 'Aceite de Coco', 'Nutiva', '052-AC', 40, 34, 1;
EXEC insert_producto 'Caf� Americano', 'Folgers', '053-CA', 120, 34, 13;
EXEC insert_producto 'Galletas de Avena', 'Quaker', '054-GA', 60, 34, 19;
EXEC insert_producto 'Jugo de Uva', 'Jumex', '055-JU', 140, 34, 2;
EXEC insert_producto 'Yogurt Griego', 'Oikos', '056-YG', 85, 34, 16;
EXEC insert_producto 'Pan de Caja', 'Wonder', '057-PC', 90, 34, 6;
EXEC insert_producto 'Mermelada de Durazno', 'Smuckers', '058-MD', 55, 34, 11;
EXEC insert_producto 'Crema de Avellanas', 'Nutella', '059-CA', 150, 34, 18;
EXEC insert_producto 'Arroz Precocido', 'Uncle Bens', '060-AP', 100, 34, 3;
EXEC insert_producto 'Frijoles Charros', 'La Sierra', '061-FC', 75, 34, 17;
EXEC insert_producto 'Galletas Digestive', 'Mar�a', '062-GD', 130, 32, 4;





DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (7, 2, 10.99),
       (30, 3, 6.99),
       (55, 1, 22.99);

EXEC crear_pedido 'Chimaltenango', 'Chimaltenango', '1', 'Calle Principal 3-45, Zona 1', '24256789', '2023-09-10', 39.97, 8, 45, @detalle_orden;

DECLARE  @detalle_orden AS tipo_detalle_orden ;
INSERT INTO  @detalle_orden (id_producto, cantidad, precio)
VALUES (2, 4, 9.99),
       (27, 2, 17.99);

EXEC crear_pedido 'Guatemala', 'Villa Nueva', '46', 'Avenida Bol�var 12-34, Zona 46', '23456780', '2023-08-18', 47.96, 19, 46,  @detalle_orden;


-- Instrucci�n 1
DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (18, 2, 14.99),
       (35, 3, 7.99),
       (52, 1, 21.99);

EXEC crear_pedido 'Suchitep�quez', 'Mazatenango', '2', 'Avenida Central 5-32, Zona 2', '24256789', '2023-09-12', 44.97, 10, 45, @detalle_orden;

-- Instrucci�n 2
DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (4, 4, 8.99),
       (29, 2, 16.99);

EXEC crear_pedido 'Quetzaltenango', 'Quetzaltenango', '46', 'Calle Santander 12-34, Zona 46', '23456780', '2023-08-22', 43.96, 17, 46, @detalle_orden;

-- Instrucci�n 3
DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (11, 2, 11.99),
       (38, 3, 9.99),
       (55, 1, 22.99);

EXEC crear_pedido 'Pet�n', 'Flores', '1', 'Avenida Principal 3-45, Zona 1', '24256789', '2023-09-15', 44.97, 12, 45, @detalle_orden;

-- Instrucci�n 4
DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (6, 4, 9.99),
       (27, 2, 17.99);

EXEC crear_pedido 'Guatemala', 'Villa Nueva', '46', 'Calle Central 12-34, Zona 46', '23456780', '2023-08-25', 47.96, 19, 46,@detalle_orden;

-- Instrucci�n 5
DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (19, 2, 15.99),
       (36, 3, 8.99),
       (53, 1, 23.99);

EXEC crear_pedido 'Retalhuleu', 'Retalhuleu', '2', 'Avenida Liberaci�n 5-32, Zona 2', '24256789', '2023-09-18', 47.97, 14, 46, @detalle_orden;

-- Instrucci�n 6--------------------------------
DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (3, 4, 7.99),
       (30, 2, 16.99);

EXEC crear_pedido 'Huehuetenango', 'Huehuetenango', '46', 'Calle Mayor 12-34, Zona 46', '23456780', '2023-08-28', 43.96, 16, 46, @detalle_orden;

-- Instrucci�n 7
DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (12, 2, 12.99),
       (39, 3, 10.99),
       (56, 1, 24.99);

EXEC crear_pedido 'San Marcos', 'San Marcos', '1', 'Avenida Principal 3-45, Zona 1', '24256789', '2023-09-21', 48.97, 13, 46, @detalle_orden;

-- Instrucci�n 8
DECLARE @detalle_orden AS tipo_detalle_orden ;
INSERT INTO @detalle_orden (id_producto, cantidad, precio)
VALUES (5, 4, 8.99),
       (32, 2, 17.99);

EXEC crear_pedido 'Guatemala', 'Mixco', '46', 'Calle Central 12-34, Zona 46', '23456780', '2023-08-31', 46.96, 20, 46, @detalle_orden;
----------------------------------------------------
-- CONSULTAS GENERALES A TABLAS 
----------------------------------------------------
select *
from bitacora;

select *
from estado;

SELECT *
FROM rol;

SELECT *
FROM categoria_producto;

SELECT * FROM producto;

SELECT * FROM usuario;

SELECT * FROM pedido;
SELECT * FROM orden;

-- ----------------------------------------
-- ELIMINACION DE TODOS LOS SP'S
-- ----------------------------------------
DROP PROCEDURE crear_pedido;
DROP PROCEDURE insert_categoria_producto;
DROP PROCEDURE insert_estado;
DROP PROCEDURE insert_producto;
DROP PROCEDURE insert_rol;
DROP PROCEDURE insert_usuario;
DROP PROCEDURE update_categoria_producto;
DROP PROCEDURE update_estado;
DROP PROCEDURE update_orden;
DROP PROCEDURE update_orden_detalle;
DROP PROCEDURE update_producto;
DROP PROCEDURE update_rol;
DROP PROCEDURE update_usuario;


select * from usuario;