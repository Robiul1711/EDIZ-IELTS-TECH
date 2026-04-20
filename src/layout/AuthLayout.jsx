import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div 
      className="flex justify-center items-center font-sans"
      style={{
        backgroundImage: `url(${ImageAssets.banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* This Outlet is where 'AuthStart' or 'Login' will appear */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;