
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import env from "@/config/environment";

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

  // Vérifier l'authentification en vérifiant la présence du cookie
  const checkAuth = () => {
    // La vérification se fait implicitement car le cookie est HttpOnly
    // On vérifie l'email stocké localement en attendant
    const storedEmail = localStorage.getItem("userEmail");
    
    if (storedEmail) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Vérifier l'authentification au chargement
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Appel API réel pour la connexion
      const response = await fetch(`${env.API_HOST}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important pour inclure les cookies
      });

      if (!response.ok) {
        throw new Error("Identifiants incorrects");
      }

      // Le cookie accessToken est automatiquement stocké par le navigateur
      // Stockons l'email pour référence
      localStorage.setItem("userEmail", email);
      setIsAuthenticated(true);
      setUserEmail(email);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = async () => {
    // Idéalement, on devrait appeler une API de déconnexion pour invalider le token
    // Pour l'instant, on se contente de supprimer la référence locale
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
