
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  // Close sidebar by default on mobile
  useEffect(() => {
    if (isMobile !== undefined) {
      setSidebarOpen(!isMobile);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main 
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : isMobile ? "ml-0" : "ml-20"
        } ${isMobile ? "mt-14" : "mt-0"}`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
