CREATE DATABASE code_camp;
use code_camp;



-- Creando tabla estado
CREATE TABLE  estado (
  id_estado INT NOT NULL IDENTITY(1,1),
  nombre VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_estado)
);

-- Creando tabla rol
CREATE TABLE  rol (
  id_rol INT NOT NULL IDENTITY(1,1),
  nombre VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_rol))

-- Creanto tabla usuario
CREATE TABLE  usuario (
  id_usuario INT NOT NULL IDENTITY(1,1),
  correo_electronico VARCHAR(70),
  contrasena VARCHAR(250),
  primer_nombre VARCHAR(100),
  segundo_nombre VARCHAR(100),
  primer_apellido VARCHAR(100),
  segundo_apellido VARCHAR(100),
  telefono VARCHAR(45) ,
  fecha_nacimiento DATE,
  fecha_creacion DATETIME,
  id_estado INT NOT NULL,
  id_rol INT NOT NULL,
  PRIMARY KEY (id_usuario),
  
  CONSTRAINT fk_usuario_estado FOREIGN KEY (id_estado) REFERENCES estado (id_estado),
  CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES rol (id_rol)
  );

-- CREANDO TABLA CATEGORIA PRODUCTO
CREATE TABLE  categoria_producto (
  id_categoria_producto INT NOT NULL IDENTITY(1,1),
  nombre VARCHAR(45),
  fecha_creacion DATETIME,
  id_estado INT NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_categoria_producto),

  CONSTRAINT fk_categoria_producto_estado FOREIGN KEY (id_estado) REFERENCES estado (id_estado),
  CONSTRAINT fk_categoria_producto_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
  );

-- CREANDO LA TABLA PRODUCTO
CREATE TABLE  producto (
  id_producto INT NOT NULL IDENTITY(1,1),
  nombre VARCHAR(45),
  marca VARCHAR(45),
  codigo VARCHAR(45),
  stock FLOAT,
  fecha_creacion DATETIME,
  foto VARBINARY(MAX),
  id_estado INT NOT NULL,
  id_categoria_producto INT NOT NULL,
  id_usuario INT NOT NULL,
  PRIMARY KEY (id_producto),
 
  CONSTRAINT fk_producto_estado FOREIGN KEY (id_estado) REFERENCES estado (id_estado),
  CONSTRAINT fk_producto_categoria_producto FOREIGN KEY (id_categoria_producto) REFERENCES categoria_producto (id_categoria_producto),
  CONSTRAINT fk_producto_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
  );

-- CREANDO LA TABLA ORDEN
CREATE TABLE  orden (
  id_orden INT NOT NULL IDENTITY(1,1),
  fecha_creacion DATETIME,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  departamento VARCHAR(70),
  municipio VARCHAR(70),
  zona varchar(10),
  complemento_direccion VARCHAR(250),
  telefono VARCHAR(45),
  correo_electronico VARCHAR(50),
  fecha_entrega DATE,
  total_orden FLOAT,
  id_usuario INT NOT NULL,
  id_estado INT NOT NULL,
  PRIMARY KEY (id_orden),
  
  CONSTRAINT fk_orden_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_orden_estado FOREIGN KEY (id_estado) REFERENCES estado (id_estado)
  );


-- CREANDO TABLA ORDEN DETALLE
CREATE TABLE  pedido (
  id_orden_detalle INT NOT NULL IDENTITY(1,1),
  cantidad INT,
  precio FLOAT,
  subtotal FLOAT,
  id_producto INT NOT NULL,
  id_orden INT NOT NULL,
  PRIMARY KEY (id_orden_detalle),
  
  CONSTRAINT fk_orden_detalle_producto FOREIGN KEY (id_producto) REFERENCES producto (id_producto),
  CONSTRAINT fk_orden_detalle_orden FOREIGN KEY (id_orden) REFERENCES orden (id_orden)
  );


  -- -----------------------------------
  -- CREACION DE TABLA BITACORA
  --------------------------------------
  CREATE TABLE bitacora(
	id_bitacora int not null IDENTITY(1,1),
	timestamp_operacion DATETIME,
	id_usuario INT NOT NULL,
	descripcion VARCHAR(250),

	PRIMARY KEY (id_bitacora)

  );


  DROP TABLE bitacora;



  -- -----------------------------------
  -- ELIMINACIÓN DE TABLAS
  --------------------------------------
  DROP TABLE pedido;
  DROP TABLE orden;
  DROP TABLE producto;
  DROP TABLE categoria_producto;
  DROP TABLE usuario;
  DROP TABLE rol;
  DROP TABLE estado;
