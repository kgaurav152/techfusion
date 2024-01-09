"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { setUserDetails } from "@/redux/slices/profileSlice";
import { apiConnector } from "@/helpers/apiConnector";
import { setEvent } from "@/redux/slices/eventSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const router = useRouter();
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    const { data } = await apiConnector("GET", "/api/logout");
    if (data.success) {
      toast.success("Logout Successful");
      dispatch(setUserDetails(null));
      Cookies.remove("token");
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data } = await apiConnector("POST", "/api/userDetails"); 
      dispatch(setUserDetails(data?.data));
    };

    const token = Cookies.get("token");
    if (token) {
      fetchUserDetails();
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await apiConnector("POST", "/api/event/getAllEvent");
      // console.log(data?.data)
      dispatch(setEvent(data?.data));
    };
    fetchEvents();
  }, [dispatch]);

  return (
    <nav className="bg-gray-900 p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex-shrink-0">
          <Link href="/" className="text-white font-bold text-lg">
            <Image
              src="/TechFusionLogo.svg"
              width={30}
              height={30}
              alt="TechFusion'24 Logo"
            />
          </Link>
        </div>

        {/* Menu for large screens */}
        <div className="hidden md:flex md:space-x-8 mr-4">
          <Link href="/" className="text-white hover:text-[#e11d48]">
            Home
          </Link>
          <Link href="/events" className="text-white hover:text-[#e11d48]">
            Events
          </Link>
          <Link
            href="/kec_techfusion_brochure.pdf"
            download={`kec_techfusion_brochure.pdf`}
            target="_blank"
            className="text-white hover:text-[#e11d48]"
          >
            Brochure
          </Link>
          <Link href="/contact-us" className="text-white hover:text-[#e11d48]">
            Contact Us
          </Link>
          {user && (
            <Link
              href="/eventregistration"
              className="text-white hover:text-[#e11d48]"
            >
              Event Registration
            </Link>
          )}
          {user && (
            <Link href="/profile" className="text-white hover:text-[#e11d48]">
              Profile
            </Link>
          )}
          {user ? (
            <Popover>
              <PopoverTrigger>
                {" "}
                <Avatar>
                  {user.gender === "female" ? (
                    <AvatarImage src="avatar_01.png" />
                  ) : (
                    <AvatarImage src="avatar_02.png" />
                  )}
                  <AvatarFallback className="bg-slate-800 text-white">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-fit text-white bg-black/50 border-primary">
                <Button variant="destructive" onClick={logoutHandler}>
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/sign-in" className="text-white hover:text-[#e11d48]">
              Login
            </Link>
          )}
        </div>

        {/* Menu icon for mobile screens */}
        <div className="md:hidden mr-1">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
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
            <Link
              href="/"
              onClick={() => {
                setIsOpen(false);
              }}
              className="text-white z-50 hover:text-[#e11d48]"
            >
              Home
            </Link>
            <Link
              href="/events"
              onClick={() => {
                setIsOpen(false);
              }}
              className="text-white z-50 hover:text-[#e11d48]"
            >
              Events
            </Link>
            <Link
              href="/kec_techfusion_brochure.pdf"
              onClick={() => {
                setIsOpen(false);
              }}
              download={`kec_techfusion_brochure.pdf`}
              target="_blank"
              className="text-white z-50 hover:text-[#e11d48]"
            >
              Brochure
            </Link>
            <Link
              href="/contact-us"
              onClick={() => {
                setIsOpen(false);
              }}
              className="text-white z-50 hover:text-[#e11d48]"
            >
              Contact Us
            </Link>
            {user && (
              <Link
                href="/eventregistration"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-white z-50 hover:text-[#e11d48]"
              >
                Event Registration
              </Link>
            )}
            {user && (
              <Link
                href="/profile"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-white z-50 hover:text-[#e11d48]"
              >
                Profile
              </Link>
            )}
            {user ? (
              <Popover>
                <PopoverTrigger>
                  {" "}
                  <Avatar>
                    {user.gender === "female" ? (
                      <AvatarImage src="avatar_01.png" />
                    ) : (
                      <AvatarImage src="avatar_02.png" />
                    )}
                    <AvatarFallback className="bg-slate-800 text-white">
                      {user?.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-fit text-white bg-black/50 border-primary">
                  <Button
                    variant="destructive"
                    onClick={logoutHandler}
                    className="z-50"
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
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
    </nav>
  );
};

export default NavBar;
