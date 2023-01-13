/* eslint-disable import/no-unresolved */
import { useState, useEffect, createContext, useContext } from 'react'

import { login, regist } from '@/libs'
import useLocalStorage from '@/hooks/useLocalStorage'

const AuthContext = createContext(null)

export function AuthProvider(props) {
  const [token, setToken] = useLocalStorage('token', '');
  const [user, setUser] = useLocalStorage('user', { name: 'System', lastName: 'Admin' });

  const { children } = props;

  const handleLogin = async (userData) => {
    const loginData = await login(userData);
    console.log('the token is: ', loginData.token);
    setToken(loginData.token);
    setUser(loginData.user);
  }

  const handleLogout = () => {
    setToken('')
    setUser({})
  }

  const handleRegist = async (newUser) => {
    try {
      const { token, user } = await regist(newUser)
      console.log('the token is: ', token)

      setToken(token)
      setUser(user)

    } catch(err) {
      throw err
    }
  }

  const value = {
    user,
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegist: handleRegist
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
