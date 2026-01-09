import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageAssets } from "@/lib/ImageProvider";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-[280px] bg-white dark:bg-gray-900 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/" onClick={onClose}>
              <img
                src={ImageAssets.logo}
                alt="Logo"
                className="w-24 dark:invert"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-6">
            {/* Navigation Links can go here in the future */}
            {/* <Link to="/about" className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors" onClick={onClose}>About</Link> */}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex flex-col gap-4">
            <button className="w-full px-8 py-3 dark:text-white bg-custom text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity shadow-md">
              Purchase
            </button>
            <Link
              to="/auth"
              onClick={onClose}
              className="w-full text-center px-8 py-3 dark:text-white hover:opacity-90 duration-300 dark:bg-Primary bg-primary font-semibold text-white hover:text-black border rounded-full hover:bg-accent transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
