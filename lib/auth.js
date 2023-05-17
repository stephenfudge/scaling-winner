import { createContext, useContext, useState } from "react";

// Create a new context for the auth state
const AuthContext = createContext();

// Define the AuthProvider component
export function AuthProvider({ children }) {
  // Initialize the auth state with an empty user object
  const [user, setUser] = useState({});

  // Define the logout function to clear the auth state
  function logout() {
    setUser({});
  }

  // Return the AuthContext.Provider with the auth state and logout function as values
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Define the useAuth hook to access the auth state and logout function
export function useAuth() {
  return useContext(AuthContext);
}
