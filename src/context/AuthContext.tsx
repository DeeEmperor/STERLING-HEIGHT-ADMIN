import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('sh_admin_token')
    const storedUser = localStorage.getItem('sh_admin_user')
    if (stored && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('sh_admin_token')
        localStorage.removeItem('sh_admin_user')
      }
    }
  }, [])

  const login = async (email: string, _password: string) => {
    // TODO: Replace with actual API call to /api/auth/admin/login
    // For now, mock login for development
    const mockUser: User = {
      id: '1',
      name: 'Estate Admin',
      email,
      role: 'ADMIN',
    }
    const mockToken = 'mock-jwt-token-' + Date.now()
    localStorage.setItem('sh_admin_token', mockToken)
    localStorage.setItem('sh_admin_user', JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const logout = () => {
    localStorage.removeItem('sh_admin_token')
    localStorage.removeItem('sh_admin_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
