const ROOT = '/'
const INVENTORY = `${ROOT}inventario`
const PRODUCTS = `${ROOT}productos`
const MOVEMENTS = `${ROOT}movimientos`
const USERS = `${ROOT}usuarios`
const ADMIN = `${ROOT}administracion`

export const ROUTES = {
  PUBLIC: {
    LOGIN: ROOT
  },
  PRIVATE: {
    INVENTORY:{
      ROOT: `${INVENTORY}`,
      KARDEX: `${INVENTORY}/kardex`
    },
    PRODUCTS: {
      ROOT: `${PRODUCTS}`,
      ADD: `${PRODUCTS}/registrar`
    },
    MOVEMENTS: {
      ROOT: `${MOVEMENTS}`,
      BUY: `${MOVEMENTS}/compra`,
      SELL: `${MOVEMENTS}/venta`,
      REFUND: `${MOVEMENTS}/devolucion`
    },
    USER: {
      ROOT: `${USERS}`,
      PROVIDERS: `${USERS}/proveedores`,
      CLIENTS: `${USERS}/clientes`
    },
    ADMIN: {
      ROOT: `${ADMIN}`,
      USERS: `${ADMIN}/usuarios`
    }
  }
}

export const PUBLIC_ROUTES = {
  LOGIN: '/'
} as const

export const PRIVATE_ROUTES = {
  INVENTORY: '/inventario',
  CREATE_KARDEX: '/inventario/crear-kardex',
  PRODUCTS: '/inventario/productos',
  ADD_PRODUCT: '/inventario/registrar-nuevo-producto',
  PROVIDERS: '/inventario/proveedores',
  BUY_PRODUCT: '/inventario/comprar-producto',
  SELL_PRODUCT: '/inventario/vender-producto',
  RETURN_PRODUCT: '/inventario/devolucion',
  CLIENTS: '/inventario/clientes',
  USERS: '/inventario/usuarios'
}
