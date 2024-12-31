import React, { createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadToken() {
      const storedToken = await SecureStore.getItemAsync('userToken')
      if (storedToken) setToken(storedToken)
      setIsLoading(false)
    }
    loadToken()
  }, [])

  const signIn = async (receivedToken) => {
    await SecureStore.setItemAsync('userToken', receivedToken)
    setToken(receivedToken)
  }

  const signOut = async () => {
    await SecureStore.deleteItemAsync('userToken')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}