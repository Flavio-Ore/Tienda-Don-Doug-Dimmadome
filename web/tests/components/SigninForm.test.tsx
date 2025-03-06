import SigninForm from '@/components/forms/SigninForm'
import { useToast } from '@/hooks/use-toast'
import useAuth from '@/states/auth/hooks/useAuth'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/states/auth/hooks/useAuth')
vi.mock('@/hooks/use-toast')

describe('SigninForm', () => {
  const mockLogin = vi.fn()
  const mockToast = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useAuth as jest.Mock).mockReturnValue({
      login: mockLogin
    })
    ;(useToast as jest.Mock).mockReturnValue({
      toast: mockToast
    })
  })

  it('renders the logo', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    )
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    )
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('renders the form', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    )
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    expect(
      screen.getByLabelText(/Contraseña/i, {
        selector: 'input'
      })
    ).toHaveAttribute('type', 'password')
    expect(
      screen.getByRole('button', { name: /Iniciar Sesión/i })
    ).toBeInTheDocument()
  })

  it('shows password when toggle button is clicked', () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    )
    const toggleButton = screen.getByRole('button', {
      name: /Mostrar contraseña/i
    })
    expect(screen.getByRole('textbox', { name: 'Correo' })).toHaveAttribute(
      'type',
      'email'
    )

    expect(
      screen.getByLabelText(/Contraseña/i, {
        selector: 'input'
      })
    ).toHaveAttribute('type', 'password')
    fireEvent.click(toggleButton)

    expect(
      screen.getByLabelText(/Contraseña/i, {
        selector: 'input'
      })
    ).toHaveAttribute('type', 'text')

    fireEvent.click(toggleButton)

    expect(
      screen.getByLabelText(/Contraseña/i, {
        selector: 'input'
      })
    ).toHaveAttribute('type', 'password')
  })

  it('submits the form with valid data', async () => {
    mockLogin.mockResolvedValue(true)
    render(
      <Router>
        <SigninForm />
      </Router>
    )
    fireEvent.input(screen.getByLabelText(/Correo/i), {
      target: { value: 'test@domain.com' }
    })
    fireEvent.input(
      screen.getByLabelText(/Contraseña/i, {
        selector: 'input'
      }),
      {
        target: { value: 'password123' }
      }
    )
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }))
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@domain.com',
        contrasena: 'password123'
      })
    })
  })

  it('shows error toast on failed login', async () => {
    mockLogin.mockResolvedValue(false)
    render(
      <Router>
        <SigninForm />
      </Router>
    )
    const emailInput = screen.getByLabelText(/Correo/i)
    const passwordInput = screen.getByLabelText(/Contraseña/i, {
      selector: 'input'
    })
    const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i })

    fireEvent.input(emailInput, {
      target: { value: 'test@domain.com' }
    })
    fireEvent.input(passwordInput, {
      target: { value: 'wrongpassword' }
    })
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Credenciales incorrectas',
        variant: 'destructive'
      })
    })
  })

  it('shows error toast on login exception', async () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    )

    fireEvent.input(screen.getByLabelText(/Correo/i), {
      target: { value: 'noexists@domain.com' }
    })

    fireEvent.input(
      screen.getByLabelText(/Contraseña/i, {
        selector: 'input'
      }),
      {
        target: { value: 'password123' }
      }
    )
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }))
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Credenciales incorrectas',
        variant: 'destructive'
      })
    })
  })

  it('shows validation errors for short email and password', async () => {
    render(
      <Router>
        <SigninForm />
      </Router>
    )

    fireEvent.input(screen.getByLabelText(/Correo/i), {
      target: { value: 'a@b.c' }
    })
    fireEvent.input(
      screen.getByLabelText(/Contraseña/i, {
        selector: 'input'
      }),
      {
        target: { value: '123' }
      }
    )
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar Sesión/i }))

    await waitFor(() => {
      expect(screen.getByText(/El email no es válido/i)).toBeInTheDocument()
      expect(
        screen.getByText(/Tu contraseña debe tener al menos 7 caracteres/i)
      ).toBeInTheDocument()
    })
  })
})
