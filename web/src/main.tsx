import InventoryProvider from '@/states/inventory/providers/InventoryProvider'
import QueryProvider from '@/states/QueryProvider'
import '@fontsource/ubuntu'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <InventoryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </InventoryProvider>
    </QueryProvider>
  </StrictMode>
)
