import App from '@/App.tsx'
import LazyPages from '@/components/LazyPage'
import '@/index.css'
import AuthProvider from '@/states/auth/providers/AuthProvider'
import QueryProvider from '@/states/doug-dimadon-tankstack-query/providers/QueryProvider'
import '@fontsource/ubuntu'
import { Toaster } from '@shadcn/toaster'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyPages>
      <Toaster />
      <QueryProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </QueryProvider>
    </LazyPages>
  </StrictMode>
)
