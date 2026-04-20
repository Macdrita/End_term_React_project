/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { clearStoredUser, getStoredUser, setStoredUser } from '../utils/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  const login = useCallback((email) => {
    const authUser = { email: email.trim().toLowerCase() }
    setUser(authUser)
    setStoredUser(authUser)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    clearStoredUser()
  }, [])

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [login, logout, user],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
