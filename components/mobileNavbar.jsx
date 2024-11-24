import Link from "next/link";
import React, { useState } from "react";
import UserAvatar from "./user-avatar";
import { navbarData } from "@/data/navbarData";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const userType = Cookies.get("userType");

  return (
    <div>
      <div className="md:hidden absolute right-4 top-4">
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
      {isOpen && (
        <div className="md:hidden mt-6">
          <div className="flex flex-col space-y-4">
            {navbarData.map(
              (nav) =>
                (nav.userType === "public" || nav.userType === userType) && (
                  <Link
                    key={nav.href}
                    href={nav.href}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="text-white z-50 hover:text-[#e11d48]"
                  >
                    {nav.label}
                  </Link>
                )
            )}

            {user ? (
              <UserAvatar />
            ) : (
              <Link
                href="/sign-in"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-white z-50 hover:text-[#e11d48]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
