import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-200 py-8 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand Details */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-2xl font-black tracking-tighter text-blue-600">
              DocAppoint
            </span>
            <p className="text-sm text-slate-500 font-medium">
              &copy; {currentYear} DocAppoint Inc. All rights reserved.
            </p>
          </div>

          {/* Social Icons Stack */}
          <div className="flex items-center gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-500 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-700 transition-colors">
              <FaLinkedin size={20} />
            </a>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Contact Support
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;