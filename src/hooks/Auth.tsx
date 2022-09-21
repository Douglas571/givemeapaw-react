import { useState, createContext, useContext } from 'react'

import { login } from '@/libs'

const AuthContext = createContext(null)

export const AuthProvider = (props) => {
  const [ token, setToken ] = useState(null)
  const { children } = props

  const handleLogin = async (userData) => {
    
    try {
      const token = await login(userData)
      console.log('the token is: ', token)
      setToken(token)
    } catch(err) {
      throw err
    }
  }

  const handleLogout = () => {
    setToken(null)
  }

  const value = {
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