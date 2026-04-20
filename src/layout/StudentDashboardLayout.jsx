import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import GridBackgroundView from "@/components/common/GridBackgroundView";
import StudentNavbar from "@/pages/stundetDashboard/StudentNavbar";
import StudentSider from "@/pages/stundetDashboard/StudentSider";

const StudentDashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div className="w-full min-h-screen relative px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <GridBackgroundView />
      </div>
      <ScrollRestoration />
            
      <div className="flex flex-col gap-6 md:gap-10 w-full max-w-[1920px] mx-auto">
        {/* Pass toggle function to Navbar */}
        <StudentNavbar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        
        <div className="w-full flex flex-col xmd:flex-row gap-6  pb-10">
          {/* Sidebar: Desktop (Always visible xmd+) & Mobile (Drawer mode) */}
          <StudentSider isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

          <main className="flex-1 w-full overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;