import { ROOT } from "@/pages/routes/root";

const INVENTORY = `${ROOT}inventario`
const PRODUCTS = `${ROOT}productos`
const MOVEMENTS = `${ROOT}movimientos`
const USERS = `${ROOT}usuarios`

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