import App from '@/App.tsx'
import LazyPages from '@/components/LazyPage'
import AuthProvider from '@/dimadon/states/AuthProvider'
import DimadonProvider from '@/dimadon/states/DimadonProvider'
import '@/index.css'
import '@fontsource/ubuntu'
import { Toaster } from '@shadcn/toaster'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyPages>
      <Toaster />
      <DimadonProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </DimadonProvider>
    </LazyPages>
  </StrictMode>
)
