import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaChrome, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo on top */}
        <div className="hidden mb-4 lg:mb-0 lg:flex lg:flex-col lg:items-center">
          <img src="/icon-512x512.png" alt="Logo" className="h-14 mb-4 lg:mt-1" />

          {/* Menu for large screens */}
          <nav className="hidden lg:block mb-8">
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-[#e11d48]">Home</a></li>
              <li><a href="/#aboutus" className="hover:text-[#e11d48]">About Us</a></li>
              <li><a href="/events" className="hover:text-[#e11d48]">Events</a></li>
              <li><a href="/contact" className="hover:text-[#e11d48]">Contact Us</a></li>
              {/* <li><a href="/sign-in" className="hover:text-[#e11d48]">Login</a></li> */}
            </ul>
          </nav>

          {/* Social Media Icons for large screens */}
          <div className="hidden lg:block">
            <ul className="flex space-x-4">
              <li>
                <a href="https://linkedin.com/company/tpo-keckatihar" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-white hover:text-sky-300" size={24} />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-white hover:text-blue-300" size={24} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/keckatihar" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-white hover:text-red-500" size={24} />
                </a>
              </li>
              <li>
                <a href="http://keck.ac.in" target="_blank" rel="noopener noreferrer">
                  <FaChrome className="text-white hover:text-yellow-200" size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Menu and Social Icons for small screens */}
        <div className="lg:hidden mb-0 flex flex-col items-center">
          {/* Menu for small screens */}
          
          <div className="max-w-7xl mx-auto">
            <img src="/icon-512x512.png" alt="Logo" className="h-14 w-14 mb-4" />
          </div>

          {/* <div> */}
            <nav className="lg:hidden mb-4">
              <ul className="flex flex-col space-y-4 items-center">
                <li><a href="/" className="hover:text-[#e11d48]">Home</a></li>
                <li><a href="/#aboutus" className="hover:text-[#e11d48]">About Us</a></li>
                <li><a href="/events" className="hover:text-[#e11d48]">Events</a></li>
                <li><a href="/contact" className="hover:text-[#e11d48]">Contact Us</a></li>
                {/* <li><a href="/sign-in" className="hover:text-[#e11d48]">Login</a></li> */}
              </ul>
            </nav>
          {/* </div> */}


          {/* Social Media Icons for small screens */}
          <div className="lg:hidden">
            <ul className="flex space-x-4">
              <li>
                <a href="https://linkedin.com/company/tpo-keckatihar/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-white hover:text-sky-300" size={24} />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-white hover:text-blue-300" size={24} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/keckatihar" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-white hover:text-red-500" size={24} />
                </a>
              </li>
              <li>
                <a href="http://keck.ac.in" target="_blank" rel="noopener noreferrer">
                  <FaChrome className="text-white hover:text-yellow-200" size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
