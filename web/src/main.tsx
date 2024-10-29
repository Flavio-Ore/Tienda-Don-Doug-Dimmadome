import App from '@/App.tsx'
import '@/index.css'
import InventoryProvider from '@/states/inventory/providers/InventoryProvider'
import QueryProvider from '@/states/queries/providers/QueryProvider'
import '@fontsource/ubuntu'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

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
