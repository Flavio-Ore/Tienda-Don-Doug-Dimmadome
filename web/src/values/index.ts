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
    INVENTORY: {
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
