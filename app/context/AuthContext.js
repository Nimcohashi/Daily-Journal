/**
 * AuthProvider component that provides authentication context to its children.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will consume the authentication context.
 *
 * @returns {JSX.Element} The AuthProvider component.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 *
 * @typedef {Object} AuthContextValue
 * @property {string|null} token - The authentication token.
 * @property {boolean} isLoading - The loading state indicating whether the token is being loaded.
 * @property {function(string): Promise<void>} signIn - Function to handle user sign-in.
 * @property {function(): Promise<void>} signOut - Function to handle user sign-out.
 */

import React, { createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

// Create a context for authentication
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // State to store the authentication token
  const [token, setToken] = useState(null)
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true)

  // useEffect to load the token from secure storage when the component mounts
  useEffect(() => {
    async function loadToken() {
      // Retrieve the token from secure storage
      const storedToken = await SecureStore.getItemAsync('userToken')
      if (storedToken) setToken(storedToken)
      // Set loading state to false after token is loaded
      setIsLoading(false)
    }
    loadToken()
  }, [])

  // Function to handle user sign-in
  const signIn = async (receivedToken) => {
    // Store the token in secure storage
    await SecureStore.setItemAsync('userToken', receivedToken)
    // Update the token state
    setToken(receivedToken)
  }

  // Function to handle user sign-out
  const signOut = async () => {
    // Delete the token from secure storage
    await SecureStore.deleteItemAsync('userToken')
    // Clear the token state
    setToken(null)
  }

  return (
    // Provide the authentication context to children components
    <AuthContext.Provider value={{ token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}