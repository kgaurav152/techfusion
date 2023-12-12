"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-white font-bold text-lg">
            Logo
          </Link>
        </div>

        {/* Menu for large screens */}
        <div className="hidden md:flex md:space-x-8 mr-4">
          <Link href="/" className="text-white hover:text-[#e11d48]">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-[#e11d48]">
            About Us
          </Link>
          <Link href="/events" className="text-white hover:text-[#e11d48]">
            Events
          </Link>
          <Link href="/kec_techfest_brochure.pdf" download={`kec_techfest_brochure.pdf`} target="_blank" className="text-white hover:text-[#e11d48]">
            Brochure
          </Link>
          <Link href="/contact" className="text-white hover:text-[#e11d48]">
            Contact Us
          </Link>
          <Link href="/sign-in" className="text-white hover:text-[#e11d48]">
            Login
          </Link>
        </div>

        {/* Menu icon for mobile screens */}
        <div className="md:hidden mr-1">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Responsive menu for mobile screens */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-white hover:text-[#e11d48]">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-[#e11d48]">
              About Us
            </Link>
            <Link href="/events" className="text-white hover:text-[#e11d48]">
              Events
            </Link>
            <Link href="/kec_techfest_brochure.pdf" download={`kec_techfest_brochure.pdf`} target="_blank" className="text-white hover:text-[#e11d48]">
              Brochure
            </Link>
            <Link href="/contact" className="text-white hover:text-[#e11d48]">
              Contact Us
            </Link>
            <Link href="/sign-in" className="text-white hover:text-[#e11d48]">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
