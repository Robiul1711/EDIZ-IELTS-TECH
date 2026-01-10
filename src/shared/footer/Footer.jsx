import React from "react";
import { Link } from "react-router-dom";
import { ImageAssets } from "@/lib/ImageProvider";

import {
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,

} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineLocationOn, MdEmail, MdPhone } from "react-icons/md";
import edizLogo from "@/assets/images/edizLogo.png";

const Footer = () => {
  return (
    <footer className="bg-[#7B73F5] dark:bg-slate-900 text-white py-12 md:py-16 section-padding-x font-poppins transition-colors duration-300">
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Left Column: Logo & Description */}
        <div className="flex flex-col items-start text-left">
          <div className="mb-6 group">
            <img
              src={ImageAssets.logo}
              alt="EDIZ IT Logo"
              className="w-32 md:w-40 dark:invert transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-sm leading-relaxed max-w-xs opacity-80 dark:text-slate-400">
            EDIZ IT Institute is one of the leading IT training centers in
            Bangladesh, dedicated to providing quality education in Graphic
            Design, Web Development, and more.
          </p>
        </div>

        {/* Middle Column: Contact Info */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-lg mb-2 relative inline-block">
            Contact Us
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-white/30 rounded-full"></span>
          </h4>
          <a
            href="tel:+8801234567890"
            className="flex items-start group hover:translate-x-1 transition-transform duration-300"
          >
            <MdPhone className="text-xl mt-1 mr-4 text-white/70 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium group-hover:text-white transition-colors">
              +880 1234 567 890
            </span>
          </a>
          <a
            href="mailto:info@edizit.com"
            className="flex items-start group hover:translate-x-1 transition-transform duration-300"
          >
            <MdEmail className="text-xl mt-1 mr-4 text-white/70 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium group-hover:text-white transition-colors">
              info@edizit.com
            </span>
          </a>
          <div className="flex items-start group hover:translate-x-1 transition-transform duration-300">
            <MdOutlineLocationOn className="text-xl mt-1 mr-4 text-white/70 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
              123 IT Park, Level 4
              <br />
              Dhaka, Bangladesh
            </span>
          </div>
        </div>

        {/* Middle Column: Courses */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-bold text-lg mb-2 relative inline-block">
            Popular Courses
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-white/30 rounded-full"></span>
          </h4>
          <img src={edizLogo} alt="" className="w-32 md:w-40 py-1 dark:invert transition-transform duration-300 group-hover:scale-105" />
          {[
            "Graphic Design",
            "Basic Computer",
            "IELTS Preparation",
            "Spoken English",     
          ].map((course, idx) => (
            <a
              key={idx}
              href="#"
              className="text-sm font-medium opacity-80 hover:opacity-100 hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              {course}
            </a>
          ))}
        </div>

        {/* Right Column: Subscribe & Social */}
        <div className="flex flex-col items-start">
          <h4 className="font-bold text-lg mb-6 relative inline-block">
            Stay Connected
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-white/30 rounded-full"></span>
          </h4>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: FaFacebookF, href: "#", color: "hover:bg-blue-600" },
              { icon: RiInstagramFill, href: "#", color: "hover:bg-pink-600" },
              { icon: FaYoutube, href: "#", color: "hover:bg-red-600" },
              { icon: FaLinkedinIn, href: "#", color: "hover:bg-blue-700" },
            
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`bg-white/10 ${item.color} p-3 rounded-2xl transition-all duration-300 hover:scale-110 border border-white/5 flex items-center justify-center shadow-lg hover:shadow-xl`}
              >
                <item.icon className="text-xl" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright & Links */}
      <div className="border-t border-white/10 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
        <p className="opacity-70">
          © {new Date().getFullYear()} EDIZ IT Institute. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <Link
            to="/privacy-policy"
            className="opacity-70 hover:opacity-100 dark:hover:text-indigo-400 transition-all duration-300 relative group"
          >
            Privacy Policy
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white dark:bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <span className="opacity-30">|</span>
          <Link
            to="/terms-and-conditions"
            className="opacity-70 hover:opacity-100 dark:hover:text-indigo-400 transition-all duration-300 relative group"
          >
            Terms & Conditions
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white dark:bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
