import { useEffect } from "react"

const ProductsCart = ({
  idProducto,
  cantidad,
  costoUnitario,
  total,
  descripcion
}: {
  idProducto: number
  cantidad: number
  costoUnitario: number
  total: number
  descripcion: string
}) => {
  useEffect(() => {
    if (selectedProducts != null) {
      sellProductForm.setValue(
        'total',
        selectedProducts.precioUnitario * watchCantidad
      )

      if (selectedProducts.stock < watchCantidad) {
        sellProductForm.setError('cantidad', {
          type: 'manual',
          message: 'No hay suficiente stock para vender'
        })
      } else {
        sellProductForm.clearErrors('cantidad')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCantidad, watchProductos])

  return <div>ProductsCart</div>
}

export default ProductsCart
