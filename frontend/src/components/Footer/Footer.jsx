import React from "react";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo or Name */}
        <div className="text-xl font-semibold text-white">PizzariaExpress</div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">How It Works</a>
          <a href="#" className="hover:text-white transition">FAQ</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><FaDiscord size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition"><FaGithub size={20} /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-4">
        &copy; {new Date().getFullYear()} PizzariaExpress. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
