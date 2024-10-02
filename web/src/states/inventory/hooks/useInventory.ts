import InventoryContext from '@/states/inventory/contexts/InventoryContext'
import { useContext } from 'react'

export default function useInventory () {
  const inventoryContext = useContext(InventoryContext)
  if (inventoryContext == null) {
    throw new Error('useInventory must be used within a InventoryProvider')
  }
  return inventoryContext
}
