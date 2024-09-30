type  ExistenceType = 'Mercadería' | 'Producto terminado' | 'Materias primas y auxiliares - Materiales' | 'Envases y embalajes' | 'Suministros diversos'

type UnitType = 'Unidad' | 'Kilogramo' | 'Litro' | 'Metro' | 'Metro cuadrado' | 'Metro cúbico' | 'Tonelada' | 'Barril' | 'Caja' | 'Paquete' | 'Saco' | 'Cilindro'

interface Kardex {
  tipo_existencia: ExistenceType
  unidad_medida: UnitType
  RUC: string
  razon_social: string
  periodo: string
  descripcion: string
}
type TipoComprobante = 'Factura' | 'Recibo por honorarios' | 'Boleta de venta'
type TipoOperacion =
  | 'Compra'
  | 'Venta'
  | 'Devolución recibida'
  | 'Devolución entregada'
