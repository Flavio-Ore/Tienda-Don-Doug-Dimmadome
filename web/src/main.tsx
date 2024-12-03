import App from '@/App.tsx'
import '@/index.css'
import QueryProvider from '@/states/queries/providers/QueryProvider'
import '@fontsource/ubuntu'

import AuthProvider from '@/states/auth/providers/AuthProvider'
import { Toaster } from '@shadcn/toaster'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
)
