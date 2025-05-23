import AuthContext from '@/dimadon/states/AuthContext'
import { useContext } from 'react'

export default function useAuth () {
  const authContext = useContext(AuthContext)
  if (authContext == null) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return authContext
}
