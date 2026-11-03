import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'recruiter-user'

const MOCK_GOOGLE_ACCOUNT = {
  name: 'Rani Prameswari',
  email: 'rani.prameswari@recruiter.com',
  role: 'Talent Lead',
  company: 'Recruiter',
  provider: 'google',
}

function readStoredUser() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [status, setStatus] = useState('idle') // idle | authenticating | authenticated

  useEffect(() => {
    try {
      if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [user])

  // Fake the Google OAuth round-trip.
  const loginWithGoogle = useCallback(async () => {
    setStatus('authenticating')
    await new Promise((resolve) => setTimeout(resolve, 1100))
    setUser(MOCK_GOOGLE_ACCOUNT)
    setStatus('authenticated')
    return MOCK_GOOGLE_ACCOUNT
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setStatus('idle')
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      status,
      isAuthenticating: status === 'authenticating',
      loginWithGoogle,
      logout,
    }),
    [user, status, loginWithGoogle, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
