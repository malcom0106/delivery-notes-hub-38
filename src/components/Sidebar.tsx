import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Settings,
  BarChart,
  Users,
  Menu
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Mobile Navigation Bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b z-40 flex items-center px-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1 text-center font-bold">SDemat</div>
        </div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 z-30 h-screen bg-white border-r transition-all duration-300 ${
          isOpen ? "w-64" : isMobile ? "w-0 -translate-x-full" : "w-20"
        } overflow-hidden ${isMobile ? "mt-14" : "mt-0"} ${isMobile ? "h-[calc(100vh-3.5rem)]" : "h-screen"}`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4">
            {isOpen && (
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-primary" />
                <span className="font-bold">SDemat</span>
              </Link>
            )}
            {(!isMobile || isOpen) && (
              <Button
                variant="ghost"
                size="icon"
                className={`ml-auto`}
                onClick={toggleSidebar}
              >
                {isOpen ? <ChevronLeft /> : <ChevronRight />}
              </Button>
            )}
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <nav className="flex flex-col gap-1 p-2">
              <NavItem 
                to="/" 
                icon={<Home className="h-5 w-5" />} 
                label="Accueil" 
                isActive={location.pathname === "/"} 
                isOpen={isOpen} 
              />
              <NavItem 
                to="/analytics" 
                icon={<BarChart className="h-5 w-5" />} 
                label="Statistiques" 
                isActive={location.pathname.includes("/analytics")} 
                isOpen={isOpen} 
              />
              <NavItem 
                to="/users" 
                icon={<Users className="h-5 w-5" />} 
                label="Utilisateurs" 
                isActive={location.pathname.includes("/users")} 
                isOpen={isOpen} 
              />
            </nav>
          </ScrollArea>
          <Separator />
          <div className="p-2">
            <NavItem 
              to="/settings" 
              icon={<Settings className="h-5 w-5" />} 
              label="Paramètres" 
              isActive={location.pathname.includes("/settings")} 
              isOpen={isOpen} 
            />
          </div>
        </div>
      </aside>

      {/* Mobile overlay backdrop */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isOpen: boolean;
};

const NavItem = ({ to, icon, label, isActive, isOpen }: NavItemProps) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 rounded-md p-2 ${
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-gray-600 hover:bg-gray-100"
      } transition-colors`}
    >
      <div className="flex-shrink-0">{icon}</div>
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
