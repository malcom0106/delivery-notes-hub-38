
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulation d'une connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Normalement ici, vous appelleriez votre API d'authentification
      // Pour l'instant, on simule une connexion réussie
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre tableau de bord",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Identifiants incorrects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Connexion</CardTitle>
          <CardDescription>
            Entrez vos identifiants pour accéder à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@domaine.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
              {!isLoading && <LogIn className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Accès sécurisé à votre espace de gestion des bons de livraison
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
