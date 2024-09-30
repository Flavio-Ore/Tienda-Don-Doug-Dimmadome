import { z } from 'zod'

/**
CREATE TABLE tipo_usuario (
    id_tipo_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_tipo_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    fecha_creacion DATE DEFAULT (CURDATE()),
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario)
);
 */

export const signInSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Tu nombre de usuario debe tener al menos 2 caracteres'
    })
    .max(50),
  password: z
    .string()
    .min(8, {
      message: 'Tu contraseña debe tener al menos 8 caracteres'
    })
    .max(255)
})

/*
CREATE TABLE categoria_producto (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);
CREATE TABLE fabricante (
    id_fabricante INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100)
);
CREATE TABLE marca (
    id_marca INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100)
);
CREATE TABLE producto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT,
    id_fabricante int,
    id_marca int,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock_actual INT NOT NULL,
    fecha_creacion date default (curdate()),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    foreign key (id_fabricante) references fabricante(id_fabricante),
    foreign key (id_marca) references marca(id_marca)
); 
 */

export const kardexValidationSchema = z.object({
  typeExistence: z.enum([
    'Mercadería',
    'Producto terminado',
    'Materias primas y auxiliares - Materiales',
    'Envases y embalajes',
    'Suministros diversos',
  ]),
  unitMeasure: z.enum([
    'Unidad',
    'Kilogramo',
    'Litro',
    'Metro',
    'Metro cuadrado',
    'Metro cúbico',
    'Tonelada',
    'Barril',
    'Caja',
    'Paquete',
    'Saco',
    'Cilindro'
  ]),
  RUC: z.string().length(11, {
    message: 'El RUC debe tener 11 caracteres'
  }),
  socialReason: z.string().max(255, {
    message: 'La razón social debe tener menos de 255 caracteres'
  }),
  period: z.string().max(255, {
    message: 'El periodo debe tener menos de 255 caracteres'
  }),
  description: z.string().max(255, {
    message: 'La descripción debe tener menos de 255 caracteres'
  })
})
/*
CREATE TABLE proveedor (
    id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(255)
);
*/
export const providerValidationSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre del proveedor debe tener al menos 2 caracteres'
    })
    .max(100),
  phone: z
    .string()
    .min(7, {
      message: 'El número de teléfono debe tener al menos 7 caracteres'
    })
    .max(20),
  email: z.string().email(),
  address: z
    .string()
    .min(2, {
      message: 'La dirección del proveedor debe tener al menos 2 caracteres'
    })
    .max(255)
})

export const movementValidationSchema = z.object({
  date: z.date(),
  typeReceipt: z.enum(['Factura', 'Boleta de venta', 'Recibo por honorarios']),
  operationType: z.enum([
    'Compra',
    'Venta',
    'Devolución recibida',
    'Devolución entregada'
  ]),
  quantity: z.number().int(),
  unitCost: z.number().int().nonnegative(),
  serial: z.string().max(255),
  number: z.string().max(255)
})
