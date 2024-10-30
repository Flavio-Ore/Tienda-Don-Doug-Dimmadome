export const ENDPOINTS = {
  GET: {
    CLIENTE: {
      READ_ALL: '/cliente/obtener'
    },
    CATEGORIA: {
      READ_ALL: '/categoria/obtener'
    },
    PRODUCTO: {
      READ_ALL: '/producto/obtener',
      ESTADO: '/producto/estado/{estado}'
    },
    USUARIO: {
      READ_ALL: '/usuarios/obtener',
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
      READ_ALL: '/tipoPago/obtener'
    },
    TIPO_USUARIO: {
      READ_ALL: '/tipoUsuario/obtener'
    }
  },
  POST: {
    API_RENIEC: {
      CREATE: '/api/reniec/dni'
    },
    CLIENTE: {
      CREATE: '/cliente/insertar'
    },
    CATEGORIA: {
      CREATE: '/categoria'
    },
    PRODUCTO: {
      CREATE: '/producto/insertar'
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
