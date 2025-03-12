
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedEmail = localStorage.getItem("userEmail");
    
    if (storedAuth === "true" && storedEmail) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulation d'une connexion - à remplacer par votre API réelle
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dans une implémentation réelle, vous vérifieriez les identifiants
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
