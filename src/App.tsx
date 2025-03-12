
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import DeliveryNoteDetails from "./pages/DeliveryNoteDetails";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

// Créer un client Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Composant pour protéger les routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Composant pour rediriger les utilisateurs connectés
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout>
              <Index />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/delivery-note/:id" 
        element={
          <ProtectedRoute>
            <Layout>
              <DeliveryNoteDetails />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            <Layout>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <AppRoutes />
          <Toaster />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
