const INVENTORY = 'inventario'
const PRODUCTS = 'productos'
const MOVEMENTS = 'movimientos'
const USERS = 'usuarios'

export const SESSION_ROUTES = {
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
  }
}