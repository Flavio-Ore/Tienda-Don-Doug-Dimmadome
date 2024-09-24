CREATE DATABASE inventario_dimadon;

USE inventario_dimadon;

-- DROP DATABASE inventario_dimadon;

CREATE TABLE tipo_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_tipo_usuario INT NOT NULL,
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id)
);
CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(255)
);
CREATE TABLE tipo_pago (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_pago VARCHAR(50) NOT NULL
);
CREATE TABLE categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);
CREATE TABLE producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock_actual INT NOT NULL,
    codigo_barra VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id)
);
CREATE TABLE proveedor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(255)
);
CREATE TABLE movimiento_entrada_salida(
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50)
);
CREATE TABLE movimiento_inventario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_proveedor INT,
    tipo_movimiento int NOT NULL,
    cantidad INT NOT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comentario TEXT,
    FOREIGN KEY (id_producto) REFERENCES producto(id),
    FOREIGN KEY (id_proveedor) REFERENCES proveedor(id),
    FOREIGN KEY (tipo_movimiento) REFERENCES movimiento_entrada_salida(id)
);
CREATE TABLE venta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    id_usuario INT,
    id_cliente INT,
    id_tipo_pago INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_tipo_pago) REFERENCES tipo_pago(id)
);
CREATE TABLE detalle_venta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2),
	id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id),
    FOREIGN KEY (id_producto) REFERENCES producto(id)
);
CREATE TABLE devolucion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT NOT NULL,
    fecha_devolucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo TEXT,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_venta)
        REFERENCES venta (id),
    FOREIGN KEY (id_producto)
        REFERENCES producto (id)
);
CREATE TABLE pedido_proveedor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega DATE,
    total DECIMAL(10 , 2 ),
    id_proveedor INT NOT NULL,
    FOREIGN KEY (id_proveedor)
        REFERENCES proveedor (id)
);	
CREATE TABLE detalle_pedido_proveedor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10 , 2 ) NOT NULL,
    subtotal DECIMAL(10 , 2 ),
    id_pedido_proveedor INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_pedido_proveedor)
        REFERENCES pedido_proveedor (id),
    FOREIGN KEY (id_producto)
        REFERENCES producto (id)
);