
import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50" 
      onClick={logout}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Déconnexion</span>
    </Button>
  );
};

export default LogoutButton;
