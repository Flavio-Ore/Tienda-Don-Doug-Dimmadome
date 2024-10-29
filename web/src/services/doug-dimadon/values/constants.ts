export const ENDPOINTS = {
  GET: {
    CLIENTE: {
      READ_ALL: '/cliente/listar'
    },
    CATEGORIA: {
      READ_ALL: '/categoria'
    },
    PRODUCTO: {
      READ_ALL: '/producto',
      ESTADO: '/producto/estado/{estado}'
    },
    USUARIO: {
      READ_ALL: '/usuarios',
      ESTADO: '/usuarios/estado/{estado}'
    },
    INVENTARIO: {
      READ_ALL: '/inventario'
    },
    KARDEX: {
      READ_ALL: '/kardex/obtener'
    },
    PROVEEDOR: {
      READ_ALL: '/proveedor/obtener'
    },
    SALIDA: {
      READ_ALL: '/salida/obtener'
    },
    ENTRADA: {
      READ_ALL: '/entrada/obtener'
    },
    DETALLE_SALIDA: {
      READ_ALL: '/detalleSalida/obtener',
      READ_ULTIMO_ID: '/detalleSalida/ultimoIdSalida'
    },
    DETALLE_ENTRADA: {
      READ_ALL: '/detalleEntrada/obtener',
      READ_ULTIMO_ID: '/detalleEntrada/ultimoIdEntrada'
    },
    TIPO_PAGO: {
      READ_ALL: '/tipoPago'
    },
    TIPO_USUARIO: {
      READ_ALL: '/tipoUsuario'
    }
  },
  POST: {
    CLIENTE: {
      CREATE: '/cliente/guardar'
    },
    CATEGORIA: {
      CREATE: '/categoria'
    },
    PRODUCTO: {
      CREATE: '/producto'
    },
    USUARIO: {
      CREATE: '/usuarios',
      LOGIN: '/usuarios/login'
    },
    PROVEEDOR: {
      CREATE: '/proveedor/insertar'
    },
    SALIDA: {
      CREATE: '/salida/insertar'
    },
    ENTRADA: {
      CREATE: '/entrada/insertar'
    },
    DETALLE_SALIDA: {
      CREATE: '/detalleSalida/insertar'
    },
    DETALLE_ENTRADA: {
      CREATE: '/detalleEntrada/guardar'
    },
    TIPO_PAGO: {
      CREATE: '/tipoPago'
    },
    TIPO_USUARIO: {
      CREATE: '/tipoUsuario'
    }
  },
  PUT: {
    USUARIO: {
      UPDATE: '/usuarios/{id}',
      UPDATE_ESTADO: '/usuarios/{id}/estado'
    },
    PRODUCTO: {
      UPDATE: '/producto/{id}',
      UPDATE_ESTADO: '/producto/{id}/estado'
    }
  }
} as const
