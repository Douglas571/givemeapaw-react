import { useState, useEffect, createContext, useContext } from 'react'

import { login } from '@/libs'
import useLocalStorage from '@/hooks/useLocalStorage'

const AuthContext = createContext(null)

export const AuthProvider = (props) => {
  const [ token, setToken ] = useLocalStorage('token', '')
  const [ user, setUser ] = useLocalStorage('user', { name: 'System', lastName: "Admin" })

  const { children } = props

  const handleLogin = async (userData) => {
    try {
      const { token, user } = await login(userData)
      console.log('the token is: ', token)

      setToken(token)
      setUser(user)

    } catch(err) {
      throw err
    }
  }

  const handleLogout = () => {
    setToken('')
  }

  const value = {
    user,
    token,
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}