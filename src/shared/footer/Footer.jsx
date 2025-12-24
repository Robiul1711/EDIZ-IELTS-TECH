import React from 'react';
import { ImageAssets } from '@/lib/ImageProvider'
import { FaLinkedinIn, FaFacebookF, FaDribbble } from 'react-icons/fa';
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineLocationOn, MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-[#7B73F5] text-white py-10 section-padding-x">
      <div className="">
        {/* Top Section */}
        <div className="flex justify-between w-full gap-8 mb-8">
          <div className='flex justify-between gap-10 w-1/2'>
          {/* Left Column: Logo & Description */}
          <div>
            <div className=" mb-4">
             
                <img src={ImageAssets.logo} alt="Logo" />
             
        
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              At EcoTech Solutions, we believe in making renewable energy simple, affordable, and reliable.
            </p>
          </div>

          {/* Middle Column: Contact Info */}
          <div className="space-y-3">
            <div className="flex items-start">
              <MdPhone className="text-lg mt-1 mr-3" />
              <span>+1 (234) 567-8900</span>
            </div>
            <div className="flex items-start">
              <MdEmail className="text-lg mt-1 mr-3" />
              <span>info@ecotechsolutions.com</span>
            </div>
            <div className="flex items-start">
              <MdOutlineLocationOn className="text-lg mt-1 mr-3" />
              <span>
                123 green energy Blvd clean
                <br />
                city , CC 14532
              </span>
            </div>
          </div>

          </div>

          {/* Right Column: Subscribe & Social */}
          <div>
            <h4 className="font-semibold mb-4">Subscribe Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/20 hover:bg-white/40 p-2 rounded-md transition-colors"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-white/20 hover:bg-white/40 p-2 rounded-md transition-colors"
              >
                <RiTwitterXFill className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-white/20 hover:bg-white/40 p-2 rounded-md transition-colors"
              >
                <FaDribbble className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-white/20 hover:bg-white/40 p-2 rounded-md transition-colors"
              >
                <FaFacebookF className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="border-t border-white/30 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2025 EDIZ IT ielts tech. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-200 transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-200 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;