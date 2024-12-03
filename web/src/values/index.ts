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
