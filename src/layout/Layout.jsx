import GridBackgroundView from "@/components/common/GridBackgroundView";
import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useState } from "react";
import ChatBox from "@/components/homeComponents/ChatBox";
import { ChatBot } from "@/components/svg/AllSVG";

const Layout = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <GridBackgroundView />
      </div>

      {/* Main Content Layer */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Global Scroll to Top Button */}
    
      <ScrollToTop />
              <div className=" right-4 bottom-4 fixed z-50 ">
          {isChatOpen && (
            <div className="mb-2">
              <ChatBox onClose={() => setIsChatOpen(false)} />
            </div>
          )}

          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="p-2 rounded-full bg-[#604CDF] shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <ChatBot className="size-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </button>
          )}
        </div>
    </div>
  );
};

export default Layout;
