import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-purple-800 text-gray-200 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-thin text-white mb-4">Crumpet</h1>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Crumpet. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-6 text-base">
            <a href="/about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="/features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Socials */}
          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

